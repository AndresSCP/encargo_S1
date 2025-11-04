import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  @ViewChild('nombreInput', { read: ElementRef }) nombreInput!: ElementRef;
  @ViewChild('apellidoInput', { read: ElementRef }) apellidoInput!: ElementRef;
  @ViewChild('tituloElement', { read: ElementRef }) tituloElement!: ElementRef;

  usuario: string = '';
  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  fechaNacimiento: Date | null = null;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private animationCtrl: AnimationController
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.usuario = navigation.extras.state['usuario'];
    }
  }

  ngOnInit() {
    // Animar título cuando carga la página
    setTimeout(() => {
      this.animarTitulo();
    }, 300);
  }

  animarTitulo() {
    if (this.tituloElement) {
      const animacion = this.animationCtrl.create()
        .addElement(this.tituloElement.nativeElement)
        .duration(1500)
        .iterations(1)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'scale(0.5)', 'scale(1)');
      
      animacion.play();
    }
  }

  limpiar() {
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacion = '';
    this.fechaNacimiento = null;

    this.aplicarAnimacion();
  }

  async mostrar() {
    if (!this.nombre || !this.apellido) {
      const alert = await this.alertController.create({
        header: 'Información incompleta',
        message: 'Por favor complete al menos el nombre y apellido',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Información Personal',
      message: `Nombre: ${this.nombre} ${this.apellido}`,
      buttons: ['OK']
    });
    await alert.present();
  }

  aplicarAnimacion() {
    if (this.nombreInput) {
      const animacionNombre = this.animationCtrl.create()
        .addElement(this.nombreInput.nativeElement)
        .duration(1000)
        .iterations(1)
        .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
        .fromTo('transform', 'translateX(100px)', 'translateX(0px)');
      
      animacionNombre.play();
    }

    if (this.apellidoInput) {
      const animacionApellido = this.animationCtrl.create()
        .addElement(this.apellidoInput.nativeElement)
        .duration(1000)
        .iterations(1)
        .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
        .fromTo('transform', 'translateX(100px)', 'translateX(0px)');
      
      animacionApellido.play();
    }
  }
}