import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tareas-trabajo',
    loadChildren: () => import('./tareas-trabajo/tareas-trabajo.module').then(m => m.TareasTrabajoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tareas-workout',
    loadChildren: () => import('./tareas-workout/tareas-workout.module').then(m => m.TareasWorkoutPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tareas-estudios',
    loadChildren: () => import('./tareas-estudios/tareas-estudios.module').then(m => m.TareasEstudiosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tareas-casa',
    loadChildren: () => import('./tareas-casa/tareas-casa.module').then(m => m.TareasCasaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'camera',
    loadChildren: () => import('./pages/camera/camera.module').then( m => m.CameraPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'maps',
    loadChildren: () => import('./pages/maps/maps.module').then( m => m.MapsPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
