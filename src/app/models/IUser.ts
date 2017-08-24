import { IMarker } from './IMarker';

export interface IUser {
    _id: string;
    login: string;
    firstName: string;
    secondName: string;
    email: string;
    created: Date;
    updated: Date;
    img: string;
    markers: IMarker[];
    token: string;
}

