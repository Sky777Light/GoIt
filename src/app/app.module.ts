import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { SharedMaterialModule } from './shared/shared-material/shared-material.module';

import { routing } from './app.routes';

import { ENV_PROVIDERS } from './environment';

import { AppComponent } from './app.component';
import { NoContentComponent } from './components/no-content';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/home/user/user.component';
import { HeaderComponent } from './components/home/header/header.component';
import { MapComponent } from './components/home/map/map.component';
import { AboutComponent } from './components/home/about/about.component';
import { CustomMarkerDirective } from './components/home/map/custom-marker/custom-marker.directive';

import { AuthGuardService } from './services/auth-guard.service';
import { LoggedGuardService } from './services/logged-guard.service';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { UserService } from './components/home/user/user.service';
import { LoginService } from './components/login/login.service';
import { MapService } from './components/home/map/map.service';
import { CustomMarkerManager } from './components/home/map/custom-marker/custom-marker.service';

// styles
import '../styles/styles.sass';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    NoContentComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    HeaderComponent,
    MapComponent,
    AboutComponent,
    CustomMarkerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyANqwcY2SbwJYDOnpjeVoFHTzMupfjuYeI',
      libraries: ['places']
    }),
    routing
  ],
  providers: [
    ENV_PROVIDERS,
    AuthGuardService,
    LoggedGuardService,
    StorageService,
    AuthService,
    UserService,
    LoginService,
    MapService,
    CustomMarkerManager
  ]
})

export class AppModule {}
