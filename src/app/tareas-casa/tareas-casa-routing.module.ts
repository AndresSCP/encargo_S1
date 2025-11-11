import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareasCasaPage } from './tareas-casa.page';

const routes: Routes = [
  {
    path: '',
    component: TareasCasaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareasCasaPageRoutingModule {}
