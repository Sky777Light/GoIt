import { Size, Point } from '@agm/core/services/google-maps-types';

export interface IMarkerIcon {
    url?: string;
    size?: Size;
    scaledSize?: Size;
    origin?: Point;
    path?: string;
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeWeight?: number;
    scale?: number;
}
