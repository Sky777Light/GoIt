import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { NoContentComponent } from './components/no-content';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/home/user/user.component';
import { MapComponent } from './components/home/map/map.component';
import { AboutComponent } from './components/home/about/about.component';

import { AuthGuardService } from './services/auth-guard.service';
import { LoggedGuardService } from './services/logged-guard.service';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    resolve: {
      user: AuthGuardService
    },
    children: [
      {
        path: 'map',
        component: MapComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'user',
        component: UserComponent
      }
    ]
  },
  {
    path: 'login',
    component:  LoginComponent,
    canActivate: [LoggedGuardService]
  },
  { path: '**',
    component: NoContentComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules });
