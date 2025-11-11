import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareasEstudiosPageRoutingModule } from './tareas-estudios-routing.module';

import { TareasEstudiosPage } from './tareas-estudios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareasEstudiosPageRoutingModule
  ],
  declarations: [TareasEstudiosPage]
})
export class TareasEstudiosPageModule {}
