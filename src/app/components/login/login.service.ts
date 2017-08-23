import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../home/users/user.service';
import { User } from '../../models/User';

declare var alertify: any;

@Injectable()
export class LoginService {

    constructor(
        private storageService: StorageService,
        private authService: AuthService,
        private router: Router,
        private userService: UserService
    ) {}

    public logIn(remember: boolean, user: any): void {
        this.authService.post('/auth/login', user).subscribe((res: any) => {
            res = JSON.parse(res._body);
            if (res.status) {
                remember ? this.storageService.set('token', res.token) : this.storageService.setSession('token', res.token) ;
                this.router.navigate(['/']);
            }
            alertify.success(res.message);
        }, (error) => {});
    }

    public logOut(): void {
        this.authService.post('/auth/logout', {}).subscribe((res: any) => {
            res = JSON.parse(res._body);
            this.storageService.remove('token');
            this.storageService.removeSession('token');
            this.userService.changeUser( new User() );
            this.router.navigate(['/login']);

            alertify.success(res.message);
        }, (error) => {});
    }
}
