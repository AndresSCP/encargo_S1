import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Animation, createAnimation, AnimationController, NavController, AlertController } from '@ionic/angular'; 
  
interface Tarea {
  nombre: string;
  prioridad: 'alta' | 'media' | 'baja';
  completada: boolean;
}

@Component({
  selector: 'app-tareas-trabajo',
  templateUrl: './tareas-trabajo.page.html',
  styleUrls: ['./tareas-trabajo.page.scss'],
  standalone: false,
})
export class TareasTrabajoPage implements OnInit, AfterViewInit {
  @ViewChild('headerElement', { read: ElementRef }) headerElement!: ElementRef;
  @ViewChild('listContainer', { read: ElementRef }) listContainerRef!: ElementRef;

  nuevaTarea: string = '';
  prioridad: 'alta' | 'media' | 'baja' = 'media';
  tareas: Tarea[] = []; 

  constructor(
    private animationCtrl: AnimationController,
    private alertController: AlertController, 
    private navCtrl: NavController 
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.animarHeader();
    }, 300);
  }

  animarHeader() {
    if (this.headerElement) {
      const animacion = this.animationCtrl.create()
        .addElement(this.headerElement.nativeElement)
        .duration(800)
        .iterations(1)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'scale(0.8)', 'scale(1)');
      
      animacion.play();
    }
  }

  async animateNewItem(element: HTMLElement) {
    const animation: Animation = createAnimation()
      .addElement(element)
      .duration(400)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(20px)', 'translateY(0px)')
      .easing('cubic-bezier(0.4, 0.0, 0.2, 1)');
    
    await animation.play();
  }

  async agregarTarea() {
    if (!this.nuevaTarea.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Debes ingresar un nombre para la tarea',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.tareas.push({
      nombre: this.nuevaTarea,
      prioridad: this.prioridad as 'alta' | 'media' | 'baja',
      completada: false
    });

    this.nuevaTarea = '';
    this.prioridad = 'media';

    setTimeout(() => {
      if (this.listContainerRef) {
        const listItems = this.listContainerRef.nativeElement.querySelectorAll('ion-item');
        if (listItems.length > 0) {
          const newItem = listItems[listItems.length - 1] as HTMLElement;
          this.animateNewItem(newItem); 
        }
      }
    }, 50);
  }

  eliminarTarea(index: number) {
    this.tareas.splice(index, 1);
  }
  
  navegarA(ruta: string) {
    this.navCtrl.navigateForward(ruta);
  }
}