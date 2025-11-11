import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareasWorkoutPage } from './tareas-workout.page';

const routes: Routes = [
  {
    path: '',
    component: TareasWorkoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareasWorkoutPageRoutingModule {}
