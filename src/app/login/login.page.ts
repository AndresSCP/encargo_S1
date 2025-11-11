import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  usuario: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async ingresar() {
    // Validacion usuario
    if (this.usuario.length < 3 || this.usuario.length > 8) {
      await this.mostrarAlerta('Error', 'El usuario debe tener entre 3 y 8 caracteres');
      return;
    }

    // Validacion contraseña
    if (this.password.length !== 4 || !/^\d{4}$/.test(this.password)) {
      await this.mostrarAlerta('Error', 'La contraseña debe tener 4 dígitos numéricos');
      return;
    }

    // Login correcto se da accesso a Home con el usuario
    let navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/home'], navigationExtras);
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
