export enum KEY_CODE {
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37,
    ENTER = 13
}

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/;
export const LOGIN_REGEX = /^[a-zA-Z0-9_-]{3,16}$/;

export const ODESSA_POS = {
  lat: 46.469391,
  lng: 30.740883,
  zoom: 14
};

export const LOCATION_MARKER = {
    position: { lat: 0, lng: 0},
    icon: {
        path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
        fillColor: '#53b0fc',
        fillOpacity: 1,
        strokeColor: '#1b71b7',
        strokeWeight: 2,
        scale: 0.3
    },
    visible: false
};

