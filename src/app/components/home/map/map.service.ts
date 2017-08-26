import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { IMarker } from '../../../models/IMarker';
import { UserService } from '../user/user.service';

declare var alertify: any;

@Injectable()
export class MapService {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {}

    public saveMarkers( markers: IMarker[] ): void {
        if(markers.length === 0){
            alertify.error('Add some markers');
            return;
        }

        this.authService.post('/api/marker/save', markers).subscribe((res: any) => {
            res = JSON.parse(res._body);
            if (res.status) {
                let markers = this.userService.get('markers');
                markers = markers.concat(res.markers);

                this.userService.set( 'markers', markers );
                alertify.success(res.message);
              } else {
                alertify.error(res.message);
              }
        }, (error) => {});
    }

}
