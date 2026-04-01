import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'nueva-incidencia',
    loadComponent: () => import('./nueva-incidencia/nueva-incidencia.page').then((m) => m.NuevaIncidenciaPage),
  },
  {
    path: 'listado',
    loadComponent: () => import('./listado/listado.page').then((m) => m.ListadoPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
