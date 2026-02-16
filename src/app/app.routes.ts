import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'La Codicia del Sabio — Sistema de Rol de Mesa',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'clases/:id',
    title: 'Clases — La Codicia del Sabio',
    loadComponent: () => import('./pages/class-detail/class-detail').then(m => m.ClassDetail)
  },
  {
    path: 'razas/:id',
    title: 'Razas — La Codicia del Sabio',
    loadComponent: () => import('./pages/race-detail/race-detail').then(m => m.RaceDetail)
  },
  {
    path: 'condiciones',
    title: 'Condiciones — La Codicia del Sabio',
    loadComponent: () => import('./pages/conditions/conditions').then(m => m.Conditions)
  },
  {
    path: 'armas',
    title: 'Armas — La Codicia del Sabio',
    loadComponent: () => import('./pages/weapons/weapons').then(m => m.Weapons)
  },
  {
    path: 'mecanicas',
    title: 'Mecánicas — La Codicia del Sabio',
    loadComponent: () => import('./pages/mechanics/mechanics').then(m => m.Mechanics)
  },
  {
    path: 'comunidad',
    title: 'Comunidad y Eventos — La Codicia del Sabio',
    loadComponent: () => import('./pages/community/community').then(m => m.Community)
  },
  {
    path: 'privacidad',
    title: 'Política de Privacidad — La Codicia del Sabio',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy').then(m => m.PrivacyPolicy)
  },
  {
    path: 'eliminar-cuenta',
    title: 'Eliminar Cuenta — La Codicia del Sabio',
    loadComponent: () => import('./pages/delete-account/delete-account').then(m => m.DeleteAccount)
  },
  {
    path: 'admin',
    title: 'Admin — La Codicia del Sabio',
    loadComponent: () => import('./pages/admin/admin-events').then(m => m.AdminEvents)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
