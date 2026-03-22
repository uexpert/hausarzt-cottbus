import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'our_praxis', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'team', loadComponent: () => import('./pages/team/team.component').then(m => m.TeamComponent) },
  { path: 'leistungen', loadComponent: () => import('./pages/performances/performances.component').then(m => m.PerformancesComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'arrival', loadComponent: () => import('./pages/arrival/arrival.component').then(m => m.ArrivalComponent) },
  { path: 'impressum', loadComponent: () => import('./pages/impressum/impressum.component').then(m => m.ImpressumComponent) },
  { path: 'privacy_policy', loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent) },

  {
    path: 'admin',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./pages/admin/admin-login/admin-login.component').then(m => m.AdminLoginComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
        canActivate: [authGuard]
      }
    ]
  },

  { path: '**', redirectTo: '/home' }
];
