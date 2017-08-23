import { IMarker } from './IMarker';

export class Marker  implements IMarker {
    public _id: string;
    public owner: string;

    constructor(
        id: string = null,
        owner: string = null
    ) {
        this._id = id;
        this.owner = owner;
    }
}