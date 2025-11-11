import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'tareas-trabajo',
    loadChildren: () => import('./tareas-trabajo/tareas-trabajo.module').then( m => m.TareasTrabajoPageModule)
  },
  {
    path: 'tareas-workout',
    loadChildren: () => import('./tareas-workout/tareas-workout.module').then( m => m.TareasWorkoutPageModule)
  },
  {
    path: 'tareas-estudios',
    loadChildren: () => import('./tareas-estudios/tareas-estudios.module').then( m => m.TareasEstudiosPageModule)
  },
  {
    path: 'tareas-casa',
    loadChildren: () => import('./tareas-casa/tareas-casa.module').then( m => m.TareasCasaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
