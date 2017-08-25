import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve }  from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { StorageService } from './storage.service';
import { AuthService } from './auth.service';
import { UserService } from '../components/home/user/user.service';
import { LoginService } from '../components/login/login.service';
import { IUser } from '../models/IUser';

declare var alertify: any;

@Injectable()
export class AuthGuardService implements CanActivate,  Resolve<any> {

  constructor(
      private router: Router,
      private storageService: StorageService,
      private authService: AuthService,
      private userService: UserService,
      private loginService: LoginService
  ) {}

  public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let token = this.storageService.get('token') || this.storageService.getSession('token');

    if ( !token ) {
      this.router.navigate(['/login']);

      alertify.error('You are not logged in');
      return Observable.of(false);
    } else if (this.userService.get('token') === token) {
      return Observable.of(true);
    } else {
      return this.authService.post(`/auth/isauth/${token}`, {}).map((res: any) => {
        res = res.json();
        if (!res.status) {
          this.storageService.remove('token');
          this.storageService.removeSession('token');
          this.router.navigate(['/login']);
          alertify.error(res.message);
          return false;
        }
        return true;
      });
    }

  }

  public resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {
    if (this.userService.User._id) {
      return Observable.of(this.userService.User);
    } else {
      return this.authService.get('/api/user/user/undefined').map((res: any) => {
        res = res.json();

        if (res.status) {
          this.userService.changeUser(res.res);
        } else {
          this.loginService.logOut();
        }
        return this.userService.User;
      });
    }

  }

}
