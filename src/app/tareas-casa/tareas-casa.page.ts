import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AnimationController, AlertController } from '@ionic/angular';

interface TareaCasa {
  nombre: string;
  categoria: string;
  frecuencia: string;
  completada: boolean;
}

@Component({
  selector: 'app-tareas-casa',
  templateUrl: './tareas-casa.page.html',
  styleUrls: ['./tareas-casa.page.scss'],
  standalone: false,
})
export class TareasCasaPage implements OnInit {
  @ViewChild('headerElement', { read: ElementRef }) headerElement!: ElementRef;

  nuevaTarea: string = '';
  categoria: string = 'limpieza';
  frecuencia: string = 'semanal';
  tareas: TareaCasa[] = [];

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
        .duration(1200)
        .iterations(1)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'scale(1.5) rotate(180deg)', 'scale(1) rotate(0deg)');
      
      animacion.play();
    }
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
      categoria: this.categoria,
      frecuencia: this.frecuencia,
      completada: false
    });

    this.nuevaTarea = '';
    this.categoria = 'limpieza';
    this.frecuencia = 'semanal';
  }

  eliminarTarea(index: number) {
    this.tareas.splice(index, 1);
  }
}