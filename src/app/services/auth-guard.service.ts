import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve }  from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { StorageService } from './storage.service';
import { AuthService } from './auth.service';
import { UserService } from '../components/home/users/user.service';
import { LoginService } from '../components/login/login.service';

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
    return this.authService.post(`/auth/isauth/${token}`, {}).map((res: any) => {
      res = res.json();
      if (!res.status) {
        this.router.navigate(['/login']);
        alertify.success(res.message);
        return false;
      }
      return true;
    });
  }

  public resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
      return this.authService.get('/api/users/user/undefined').map((res: any) => {
        res = res.json();
        if (res.status) {
          this.userService.changeUser(res.res);
          return this.userService.User;
        } else {
          this.loginService.logOut();
          return false;
        }
      });
  }

}