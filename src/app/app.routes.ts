import { Routes } from '@angular/router';
// import { HomeComponent } from './pages/home/home.component';
// import { AboutComponent } from './pages/about/about.component';
// import { TeamComponent } from './pages/team/team.component';
// import { PerformancesComponent } from './pages/performances/performances.component';
// import { ContactComponent } from './pages/contact/contact.component';
// import { ArrivalComponent } from './pages/arrival/arrival.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to 'home'
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
    { path: 'our_praxis', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
    { path: 'team', loadComponent: () => import('./pages/team/team.component').then(m => m.TeamComponent) },
    { path: 'leistungen', loadComponent: () => import('./pages/performances/performances.component').then(m => m.PerformancesComponent) },
    { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
    { path: 'arrival', loadComponent: () => import('./pages/arrival/arrival.component').then(m => m.ArrivalComponent) },
    { path: 'impressum', loadComponent: () => import('./pages/impressum/impressum.component').then(m => m.ImpressumComponent) },
    { path: 'privacy_policy', loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent) },
    { path: '**', redirectTo: '/home' } // Redirect unknown paths to 'home'
  ];
  
// export const routes: Routes = [
//     { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to 'home'
//     { path: 'home', component: HomeComponent},
//     { path: 'about', component: AboutComponent },
//     { path: 'team', component: TeamComponent },
//     { path: 'leistungen', component: PerformancesComponent },
//     { path: 'contact', component: ContactComponent },
//     { path: 'arrival', component: ArrivalComponent },
//     { path: '**', redirectTo: '/home' } // Redirect unknown paths to 'home'
//   ];
