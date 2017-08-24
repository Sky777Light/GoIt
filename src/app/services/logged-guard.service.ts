import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }  from '@angular/router';
import { StorageService } from './storage.service';
import { UserService } from '../components/home/user/user.service';

@Injectable()
export class LoggedGuardService implements CanActivate {

    constructor(
        private router: Router,
        private storageService: StorageService,
        private userService: UserService
    ) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let token = this.storageService.get('token') || this.storageService.getSession('token');

        if(this.userService.get('token') !== token) return true;

        this.router.navigate(['/']);
        return false;
    }

}
