import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareasTrabajoPageRoutingModule } from './tareas-trabajo-routing.module';

import { TareasTrabajoPage } from './tareas-trabajo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareasTrabajoPageRoutingModule
  ],
  declarations: [TareasTrabajoPage]
})
export class TareasTrabajoPageModule {}
