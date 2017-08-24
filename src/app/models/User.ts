import { IUser } from './IUser';
import { IMarker } from './IMarker';

export class User  implements IUser {
    public _id: string;
    public login: string;
    public firstName: string;
    public secondName: string;
    public email: string;
    public created: Date;
    public updated: Date;
    public img: string;
    public markers: IMarker[];
    public token: string;

    constructor(
        id: string = null,
        login: string = '',
        firstName: string = '',
        secondName: string = '',
        email: string = '',
        created: Date = null,
        updated: Date = null,
        img: string = null,
        markers: IMarker[] = [],
        token: string = 'undefined'
    ) {
        this._id = id;
        this.login = login;
        this.firstName = firstName;
        this.secondName = secondName;
        this.email = email;
        this.created = created;
        this.updated = updated;
        this.img = img;
        this.markers = markers;
        this.token = token;
    }
}
