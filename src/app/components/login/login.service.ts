import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../home/user/user.service';
import { User } from '../../models/User';

declare var alertify: any;

interface ILoginData {
    login: string;
    password: string;
    remember: boolean;
}

@Injectable()
export class LoginService {
    constructor(
        private storageService: StorageService,
        private authService: AuthService,
        private router: Router,
        private userService: UserService
    ) {}

    public logIn(loginData: ILoginData): void {
        this.storageService.remove('token');
        this.storageService.removeSession('token');

        this.authService.post('/auth/login', loginData).subscribe((res: any) => {
            res = JSON.parse(res._body);
          console.log(res);
          if (res.status) {
                loginData.remember ? this.storageService.set('token', res.user.token) : this.storageService.setSession('token', res.user.token);
                this.userService.changeUser( res.user );
                this.router.navigate(['/']);
                alertify.success(res.message);
              } else {
                alertify.error(res.message);
              }
        }, (error) => {});
    }

    public logOut(): void {
        this.authService.post('/auth/logout', {}).subscribe((res: any) => {
            res = JSON.parse(res._body);
            this.storageService.remove('token');
            this.storageService.removeSession('token');
            this.userService.changeUser( new User() );
            this.router.navigate(['/login']);
            if(res.status) {
              alertify.success(res.message);
            } else {
              alertify.error(res.message);
            }

        }, (error) => {});
    }
}
