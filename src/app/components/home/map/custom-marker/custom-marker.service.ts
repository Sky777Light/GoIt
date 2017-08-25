import { AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
import { IMarkerOptions } from '../../../../models/IMarkerOptions';
import { IMarkerIcon } from '../../../../models/IMarkerIcon';
import { Injectable } from '@angular/core';

declare const google: any;

@Injectable()
export class CustomMarkerManager {

    constructor(private mapManager: GoogleMapsAPIWrapper) {}

    public addCustomMarker(opts: IMarkerOptions) {
        console.log(123);
        this.mapManager.getNativeMap().then( (map) => {
            opts.map = map;
            new google.maps.Marker(opts);
        });
    }

    public createIcon( iconOpts: any ) {
        let newIcon: IMarkerIcon = {
            url: iconOpts.iurl,
            size: new google.maps.Size(iconOpts.width, iconOpts.height),
            path: iconOpts.ipath,
            fillColor: iconOpts.ifillColor,
            fillOpacity: iconOpts.ifillOpacity,
            strokeColor: iconOpts.istrokeColor,
            strokeWeight: iconOpts.istrokeWeight,
            scale: iconOpts.iscale
        };

        return newIcon;
    }
}
