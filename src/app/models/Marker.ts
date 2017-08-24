import { IMarker } from './IMarker';

export class Marker  implements IMarker {
    public _id: string;
    public owner: string;
    public lat: number;
    public lng: number;
    public label: string;
    public draggable: boolean;
    public visible: boolean;

    constructor(
        id: string = null,
        owner: string = null,
        lat: number = 0,
        lng: number = 0,
        label: string = '',
        draggable: boolean = false,
        visible: boolean = true
    ) {
        this._id = id;
        this.owner = owner;
        this.lat = lat;
        this.lng = lng;
        this.label = label;
        this.draggable = draggable;
        this.visible = visible;
    }
}
