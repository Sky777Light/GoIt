import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }  from '@angular/router';
import { StorageService } from './storage.service';
import { UserService } from '../components/home/user/user.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

declare var alertify: any;

@Injectable()
export class LoggedGuardService implements CanActivate {

    constructor(
        private router: Router,
        private storageService: StorageService,
        private authService: AuthService,
        private userService: UserService
    ) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let token = this.storageService.get('token') || this.storageService.getSession('token');

        if ( !!token ) {
            return Observable.of(false);
        } else if ( this.userService.get('token') === token ) {
            alertify.error('You need logout first');
            return Observable.of(false);
        } else {

            return this.authService.post(`/auth/isauth/${token}`, {}).map((res: any) => {
                res = res.json();
                if (!res.status) {
                    this.storageService.remove('token');
                    this.storageService.removeSession('token');
                    return true;
                }
                alertify.error('You already logged in');
                this.router.navigate(['/']);
                return false;
            });

        }
    }

}
