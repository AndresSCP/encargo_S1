import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TareasCasaPageRoutingModule } from './tareas-casa-routing.module';
import { TareasCasaPage } from './tareas-casa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareasCasaPageRoutingModule
  ],
  declarations: [TareasCasaPage]
})
export class TareasCasaPageModule {}