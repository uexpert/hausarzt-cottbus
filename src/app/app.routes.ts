import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to 'home'
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
    { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
    { path: 'leistungen', loadComponent: () => import('./pages/performances/performances.component').then(m => m.PerformancesComponent) },
    { path: '**', redirectTo: '/home' } // Redirect unknown paths to 'home'
  ];
