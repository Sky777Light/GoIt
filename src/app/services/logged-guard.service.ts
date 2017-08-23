import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }  from '@angular/router';
import { StorageService } from './storage.service';

@Injectable()
export class LoggedGuardService implements CanActivate {

    constructor(
        private router: Router,
        private storageService: StorageService
    ) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.storageService.get('token') && !this.storageService.getSession('token')) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }

}