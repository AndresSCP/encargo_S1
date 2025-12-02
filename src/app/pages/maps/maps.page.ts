import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
  standalone: false,
})
export class MapsPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getLocationAndShowOnMap();
  }

  async getLocationAndShowOnMap() {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // MOSTRAR coordenadas en el mapa
      const mapFrame = document.getElementById('mapFrame') as HTMLIFrameElement;
      mapFrame.src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    } catch (error) {
      console.error('❌ Error al obtener ubicación:', error);
    }
  }
}