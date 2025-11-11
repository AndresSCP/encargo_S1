import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AnimationController, AlertController } from '@ionic/angular';

interface TareaEstudio {
  asignatura: string;
  tema: string;
  tipo: string;
  fechaLimite?: string;
  completada: boolean;
}

@Component({
  selector: 'app-tareas-estudios',
  templateUrl: './tareas-estudios.page.html',
  styleUrls: ['./tareas-estudios.page.scss'],
  standalone: false,
})
export class TareasEstudiosPage implements OnInit {
  @ViewChild('headerElement', { read: ElementRef }) headerElement!: ElementRef;

  asignatura: string = '';
  tema: string = '';
  tipo: string = 'lectura';
  fechaLimite: string = '';
  tareas: TareaEstudio[] = [];

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
        .duration(1000)
        .iterations(1)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateX(-100px)', 'translateX(0)');
      
      animacion.play();
    }
  }

  async agregarTarea() {
    if (!this.asignatura.trim() || !this.tema.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Debes completar asignatura y tema',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.tareas.push({
      asignatura: this.asignatura,
      tema: this.tema,
      tipo: this.tipo,
      fechaLimite: this.fechaLimite,
      completada: false
    });

    this.asignatura = '';
    this.tema = '';
    this.tipo = 'lectura';
    this.fechaLimite = '';
  }

  eliminarTarea(index: number) {
    this.tareas.splice(index, 1);
  }
}