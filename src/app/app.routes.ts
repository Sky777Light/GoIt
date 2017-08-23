import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { NoContentComponent } from './components/no-content';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoggedGuardService } from './services/logged-guard.service';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    resolve: {
      user: AuthGuardService
    },
    // children: [
    //   {
    //     path: 'map',
    //     component: MapComponent
    //   },
    //   {
    //     path: 'about',
    //     component: AboutComponent
    //   }
    // ]
  },
  {
    path: 'login',
    component:  LoginComponent,
    canActivate: [LoggedGuardService]
  },
  { path: '**',
    component: NoContentComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules });