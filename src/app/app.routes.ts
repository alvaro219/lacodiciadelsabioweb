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
    path: 'manuales',
    title: 'Manuales — La Codicia del Sabio',
    loadComponent: () => import('./pages/guides/guides').then(m => m.Guides)
  },
  {
    path: 'manuales/:id',
    title: 'Manuales — La Codicia del Sabio',
    loadComponent: () => import('./pages/guide-detail/guide-detail').then(m => m.GuideDetail)
  },
  {
    path: 'guias',
    redirectTo: 'manuales'
  },
  {
    path: 'guias/:id',
    redirectTo: 'manuales/:id'
  },
  {
    path: 'novedades',
    title: 'Novedades — La Codicia del Sabio',
    loadComponent: () => import('./pages/novedades/novedades').then(m => m.Novedades)
  },
  {
    path: 'novedades/:id',
    loadComponent: () => import('./pages/novedad-detail/novedad-detail').then(m => m.NovedadDetail)
  },
  {
    path: 'admin/novedades',
    title: 'Admin Novedades — La Codicia del Sabio',
    loadComponent: () => import('./pages/admin/admin-novedades').then(m => m.AdminNovedades)
  },
  {
    path: 'eventos',
    title: 'Eventos — La Codicia del Sabio',
    loadComponent: () => import('./pages/eventos/eventos').then(m => m.Eventos)
  },
  {
    path: 'creaciones',
    title: 'Creaciones — La Codicia del Sabio',
    loadComponent: () => import('./pages/creaciones/creaciones').then(m => m.Creaciones)
  },
  {
    path: 'comunidad',
    redirectTo: 'creaciones'
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
    path: 'admin/creaciones',
    title: 'Admin Creaciones — La Codicia del Sabio',
    loadComponent: () => import('./pages/admin/admin-creaciones').then(m => m.AdminCreaciones)
  },
  {
    path: 'mis-creaciones',
    title: 'Mis Creaciones — La Codicia del Sabio',
    loadComponent: () => import('./pages/my-creations/my-creations').then(m => m.MyCreations)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
