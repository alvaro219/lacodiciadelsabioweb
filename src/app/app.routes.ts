import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'clases/:id',
    loadComponent: () => import('./pages/class-detail/class-detail').then(m => m.ClassDetail)
  },
  {
    path: 'razas/:id',
    loadComponent: () => import('./pages/race-detail/race-detail').then(m => m.RaceDetail)
  },
  {
    path: 'mecanicas',
    loadComponent: () => import('./pages/mechanics/mechanics').then(m => m.Mechanics)
  },
  {
    path: 'comunidad',
    loadComponent: () => import('./pages/community/community').then(m => m.Community)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
