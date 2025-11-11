import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TareasWorkoutPageRoutingModule } from './tareas-workout-routing.module';
import { TareasWorkoutPage } from './tareas-workout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareasWorkoutPageRoutingModule
  ],
  declarations: [TareasWorkoutPage]
})
export class TareasWorkoutPageModule {}