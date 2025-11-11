import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AnimationController, AlertController } from '@ionic/angular';

interface Ejercicio {
  nombre: string;
  series: number;
  repeticiones: number;
  completado: boolean;
}

@Component({
  selector: 'app-tareas-workout',
  templateUrl: './tareas-workout.page.html',
  styleUrls: ['./tareas-workout.page.scss'],
  standalone: false,
})
export class TareasWorkoutPage implements OnInit {
  @ViewChild('headerElement', { read: ElementRef }) headerElement!: ElementRef;

  nuevoEjercicio: string = '';
  series: number = 3;
  repeticiones: number = 12;
  ejercicios: Ejercicio[] = [];

  constructor(
    private animationCtrl: AnimationController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
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
        .fromTo('transform', 'rotateX(-90deg)', 'rotateX(0deg)');
      
      animacion.play();
    }
  }

  async agregarEjercicio() {
    if (!this.nuevoEjercicio.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Debes ingresar un nombre para el ejercicio',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.ejercicios.push({
      nombre: this.nuevoEjercicio,
      series: this.series || 3,
      repeticiones: this.repeticiones || 12,
      completado: false
    });

    this.nuevoEjercicio = '';
    this.series = 3;
    this.repeticiones = 12;
  }

  eliminarEjercicio(index: number) {
    this.ejercicios.splice(index, 1);
  }
}