import { Directive, Input, OnChanges } from '@angular/core';
import { CustomMarkerManager } from './custom-marker.service';
import { IMarkerOptions } from '../../../../models/IMarkerOptions';

@Directive({
    selector: 'custom-marker',
    providers: [CustomMarkerManager]
})

export class CustomMarkerDirective implements OnChanges {
    @Input() public iurl: string;
    @Input() public iwidth: number;
    @Input() public iheight: number;
    @Input() public ipath: string;
    @Input() public ifillColor: string;
    @Input() public ifillOpacity: number;
    @Input() public istrokeColor: string;
    @Input() public istrokeWeight: number;
    @Input() public iscale: number;

    @Input() public lat: number;
    @Input() public lng: number;
    @Input() public clickable: boolean;
    @Input() public draggable: boolean;
    @Input() public crossOnDrag: boolean;
    @Input() public label: string;
    @Input() public title: string;
    @Input() public opacity: number;
    @Input() public zIndex: number;
    @Input() public visible: boolean;
    @Input() public cursor: string;

    public addedToManager = false;

    constructor(private manager: CustomMarkerManager) {}

    ngOnChanges() {
        if (!this.addedToManager) {
            let newIcon: any = {
               url: this.iurl,
               w: this.iwidth,
               h: this.iheight,
               path: this.ipath,
               fillColor: this.ifillColor,
               fillOpacity: this.ifillOpacity,
               strokeColor: this.istrokeColor,
               strokeWeight: this.istrokeWeight,
               scale: this.iscale
             };

            let opts: IMarkerOptions = {
                position: {
                    lat: this.lat,
                    lng: this.lng
                },
                icon: this.manager.createIcon( newIcon ),
                clickable: this.clickable,
                draggable: this.draggable,
                crossOnDrag: this.crossOnDrag,
                label: this.label,
                title: this.title,
                opacity: this.opacity,
                zIndex: this.zIndex,
                visible: this.visible,
                cursor: this.cursor
            };

            this.manager.addCustomMarker( opts );
        }
    }
}
