import { IUser } from './IUser';
import { IMarker } from './IMarker';

export class User  implements IUser {
    public _id: string;
    public firstName: string;
    public secondName: string;
    public email: string;
    public created: Date;
    public updated: Date;
    public img: string;
    public markers: IMarker[];

    constructor(
        id: string = null,
        firstName: string = '',
        secondName: string = '',
        email: string = '',
        created: Date = null,
        updated: Date = null,
        img: string = null,
        markers: IMarker[] = []
    ) {
        this._id = id;
        this.firstName = firstName;
        this.secondName = secondName;
        this.email = email;
        this.created = created;
        this.updated = updated;
        this.img = img;
        this.markers = markers;
    }
}
