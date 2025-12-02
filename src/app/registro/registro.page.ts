import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage implements OnInit {
  usuario: string = '';
  email: string = '';
  password: string = '';
  confirmarPassword: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  async registrarse() {
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      await this.mostrarAlerta('Error', 'Debe ingresar un email válido');
      return;
    }

    // Validar usuario
    if (this.usuario.length < 3 || this.usuario.length > 8) {
      await this.mostrarAlerta('Error', 'El usuario debe tener entre 3 y 8 caracteres');
      return;
    }

    // Validar contraseña
    if (this.password.length !== 4 || !/^\d{4}$/.test(this.password)) {
      await this.mostrarAlerta('Error', 'La contraseña debe tener 4 dígitos numéricos');
      return;
    }

    // Validar confirmación
    if (this.password !== this.confirmarPassword) {
      await this.mostrarAlerta('Error', 'Las contraseñas no coinciden');
      return;
    }

    // Intentar registrar (se llama sin el argumento 'nombre')
    const registrado = await this.authService.register(
      this.usuario,
      this.password,
      this.email
    );
    
    if (registrado) {
      await this.mostrarAlerta('Éxito', 'Usuario registrado correctamente');
      this.router.navigate(['/login']);
    } else {
      await this.mostrarAlerta('Error', 'El usuario o email ya existe');
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}