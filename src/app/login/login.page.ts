import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  usuario: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.zone.run(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  async ingresar() {
    // Validaciones...
    if (this.usuario.length < 3 || this.usuario.length > 8) {
      await this.mostrarAlerta('Error', 'El usuario debe tener entre 3 y 8 caracteres');
      return;
    }

    if (this.password.length !== 4 || !/^\d{4}$/.test(this.password)) {
      await this.mostrarAlerta('Error', 'La contraseña debe tener 4 dígitos numéricos');
      return;
    }

    const loginExitoso = await this.authService.login(this.usuario, this.password);

    if (loginExitoso) {
      this.zone.run(() => {
        this.router.navigate(['/home']);
      });
    } else {
      await this.mostrarAlerta('Error', 'Usuario o contraseña incorrectos');
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
