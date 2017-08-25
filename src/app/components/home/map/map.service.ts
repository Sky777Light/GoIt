import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { AuthService } from '../../../services/auth.service';
import { IMarker } from '../../../models/IMarker';

declare var alertify: any;

@Injectable()
export class MapService {
    constructor(
        private storageService: StorageService,
        private authService: AuthService,
        private router: Router
    ) {}

    public saveMarkers( markers: IMarker[] ): void {
        if(markers.length === 0){
            alertify.error('Add some markers');
            return;
        }

        this.authService.post('/api/marker/save', markers).subscribe((res: any) => {
            res = JSON.parse(res._body);
            console.log(res);
            // if (res.status) {
            //     loginData.remember ? this.storageService.set('token', res.user.token) : this.storageService.setSession('token', res.user.token);
            //     this.userService.changeUser( res.user );
            //     this.router.navigate(['/']);
            //     alertify.success(res.message);
            //   } else {
            //     alertify.error(res.message);
            //   }
        }, (error) => {});
    }
    //
    // public logOut(): void {
    //     this.authService.post('/auth/logout', {}).subscribe((res: any) => {
    //         res = JSON.parse(res._body);
    //         this.storageService.remove('token');
    //         this.storageService.removeSession('token');
    //         this.userService.changeUser( new User() );
    //         this.router.navigate(['/login']);
    //         if(res.status) {
    //           alertify.success(res.message);
    //         } else {
    //           alertify.error(res.message);
    //         }
    //
    //     }, (error) => {});
    // }
}
