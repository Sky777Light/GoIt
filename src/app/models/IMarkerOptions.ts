import { GoogleMap, LatLngLiteral } from '@agm/core/services/google-maps-types';
import { IMarkerIcon } from './IMarkerIcon';

export interface IMarkerOptions {
    map?: GoogleMap;
    position: LatLngLiteral;
    icon?: IMarkerIcon;
    clickable?: boolean;
    draggable?: boolean;
    crossOnDrag?: boolean;
    label?: string;
    title?: string;
    opacity?: number;
    zIndex?: number;
    visible?: boolean;
    cursor?: string;
}
