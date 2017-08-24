export enum KEY_CODE {
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37,
    ENTER = 13
}

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/;
export const LOGIN_REGEX = /^[a-zA-Z0-9_-]{3,16}$/;

export const ODESSA_POS = {
  lat: 23.469391,
  lng: 23.740883,
  zoom: 14
};
