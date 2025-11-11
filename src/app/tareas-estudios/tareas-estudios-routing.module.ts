import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareasEstudiosPage } from './tareas-estudios.page';

const routes: Routes = [
  {
    path: '',
    component: TareasEstudiosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareasEstudiosPageRoutingModule {}
