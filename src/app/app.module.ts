import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from './shared/shared-material/shared-material.module';

import { routing } from './app.routes';

import { ENV_PROVIDERS } from './environment';

import { AppComponent } from './app.component';
import { NoContentComponent } from './components/no-content';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/home/users/user.component';

import { AuthGuardService } from './services/auth-guard.service';
import { LoggedGuardService } from './services/logged-guard.service';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { UserService } from './components/home/users/user.service';
import { LoginService } from './components/login/login.service';

// styles
import '../styles/styles.sass';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    NoContentComponent,
    LoginComponent,
    HomeComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    routing
  ],
  providers: [
    ENV_PROVIDERS,
    AuthGuardService,
    LoggedGuardService,
    StorageService,
    AuthService,
    UserService,
    LoginService
  ]
})

export class AppModule {}
