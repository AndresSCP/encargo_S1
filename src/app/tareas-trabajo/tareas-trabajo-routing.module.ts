import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareasTrabajoPage } from './tareas-trabajo.page';

const routes: Routes = [
  {
    path: '',
    component: TareasTrabajoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareasTrabajoPageRoutingModule {}
