import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  @ViewChild('tituloElement', { read: ElementRef }) tituloElement!: ElementRef;

  usuario: string = '';

  constructor(
    private router: Router,
    private animationCtrl: AnimationController
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.usuario = navigation.extras.state['usuario'];
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.animarTitulo();
    }, 300);
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

  navegarA(ruta: string) {
    this.router.navigate([ruta]);
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
  }
}