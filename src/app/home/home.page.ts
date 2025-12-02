import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthService } from '../services/auth';
import { ApiService } from '../services/api.services';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  @ViewChild('tituloElement', { read: ElementRef }) tituloElement!: ElementRef;

  usuario: string = '';
  posts: Post[] = [];
  loading: boolean = false;

  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private authService: AuthService,
    private apiService: ApiService
  ) {
    // Obtener el usuario del AuthService (sesión persistente)
    this.usuario = this.authService.getCurrentUser();
  }

  ngOnInit() {
    setTimeout(() => {
      this.animarTitulo();
    }, 300);

    // Cargar posts desde la API
    this.cargarPostsDesdeAPI();
  }

  animarTitulo() {
    if (this.tituloElement) {
      const animacion = this.animationCtrl.create()
        .addElement(this.tituloElement.nativeElement)
        .duration(1000)
        .iterations(1)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(-50px)', 'translateY(0)');
      
      animacion.play();
    }
  }

  // Cargar posts desde la API REST
  cargarPostsDesdeAPI() {
    this.loading = true;

    // Usar .subscribe() para manejar la petición HTTP
    this.apiService.getPosts().subscribe({
      next: (posts) => {
        console.log('✅ Posts cargados exitosamente desde API:', posts.length);
        this.posts = posts.slice(0, 10);
        this.loading = false;
        
        // Guardar en localStorage para persistencia offline
        this.guardarPostsEnCache(posts);
      },
      error: (error) => {
        console.error('❌ Error al cargar posts desde API:', error);
        this.loading = false;
        
        // Si hay error (404, sin internet), cargar desde caché
        console.log('📦 Intentando cargar posts desde caché...');
        this.cargarPostsDesdeCache();
      },
      complete: () => {
        console.log('Petición completada');
      }
    });
  }

  // Guardar posts en localStorage (persistencia)
  private guardarPostsEnCache(posts: Post[]) {
    try {
      localStorage.setItem('posts_cache', JSON.stringify(posts));
      localStorage.setItem('posts_cache_timestamp', new Date().toISOString());
      console.log('💾 Posts guardados en caché local');
    } catch (error) {
      console.error('Error al guardar en caché:', error);
    }
  }

  // Cargar posts desde localStorage cuando no hay internet
  private cargarPostsDesdeCache() {
    try {
      const postsGuardados = localStorage.getItem('posts_cache');
      if (postsGuardados) {
        this.posts = JSON.parse(postsGuardados).slice(0, 10);
        const timestamp = localStorage.getItem('posts_cache_timestamp');
        console.log('✅ Posts cargados desde caché:', this.posts.length);
        console.log('📅 Última actualización:', timestamp);
      } else {
        console.log('⚠️ No hay posts guardados en caché');
      }
    } catch (error) {
      console.error('Error al cargar desde caché:', error);
    }
  }

  //para uso de api de ejemplo
  crearPostEjemplo() {
    const nuevoPost: Partial<Post> = {
      userId: 1,
      title: 'Post creado desde mi app',
      body: 'Este es un ejemplo de creación de post'
    };

    this.apiService.createPost(nuevoPost).subscribe({
      next: (post) => {
        console.log('✅ Post creado exitosamente:', post);
        // Agregar al inicio de la lista
        this.posts.unshift(post);
      },
      error: (error) => {
        console.error('❌ Error al crear post:', error);
      }
    });
  }

  navegarA(ruta: string) {
    this.router.navigate([ruta]);
  }

  cerrarSesion() {
    this.authService.logout();
  }
}