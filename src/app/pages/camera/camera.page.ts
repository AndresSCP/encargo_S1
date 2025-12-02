import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: false,
})
export class CameraPage implements OnInit {

  public photo: SafeResourceUrl | undefined;

  constructor(
    private sanitizer: DomSanitizer, 
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('📸 Página de cámara cargada');
  }
  
  async takePicture() {
    try { 
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera // Forzar usar la cámara
      });

      if (image.webPath) {
        this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);
        console.log('✅ Foto capturada exitosamente');
        
        // Opcional: Guardar en localStorage para persistencia
        this.guardarFotoEnCache(image.webPath);
      } else {
        console.warn('⚠️ Captura de imagen cancelada o webPath no disponible.');
      }

    } catch (error) {
      console.error('❌ Error al capturar foto:', error);
      this.mostrarAlerta('Error de Cámara', 'No se pudo tomar o mostrar la foto: ' + error);
    }
  }

  // Guardar foto en localStorage (opcional, para demostrar persistencia)
  private guardarFotoEnCache(webPath: string) {
    try {
      localStorage.setItem('ultima_foto', webPath);
      localStorage.setItem('ultima_foto_timestamp', new Date().toISOString());
      console.log('💾 Foto guardada en caché');
    } catch (error) {
      console.error('Error al guardar foto en caché:', error);
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

  // Método alternativo para volver (por si el ion-back-button no funciona)
  volverAlHome() {
    this.router.navigate(['/home']);
  }

}