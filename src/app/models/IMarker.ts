export interface IMarker {
    _id: string;
    owner: string;
    lat: number,
    lng: number,
    label: string,
    draggable: boolean,
    visible: boolean
}

