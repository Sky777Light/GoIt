import { Injectable } from '@angular/core';
import { IUser } from '../../../models/IUser';
import { User } from '../../../models/User';

@Injectable()
export class UserService {

  public _User: IUser = new User();

  constructor() {}

  public get User() {
    return this._clone(this._User);
  }

  public set User(value) {
    throw new Error('do not mutate the `.User` directly');
  }

  public get(prop?: any) {
    const User = this.User;
    return User.hasOwnProperty(prop) ? User[prop] : User;
  }

  public set(prop: string, value: any) {
    let val = JSON.parse(JSON.stringify( value ));
    return this._User[prop] = val;
  }

  public changeUser(user: IUser) {
    this._User = JSON.parse(JSON.stringify( user ));
  }

  private _clone(user: IUser) {
    return JSON.parse(JSON.stringify( user ));
  }
  // lettersNoImg(user: any): string{
  //   let l1= '';
  //   let l2= '';
  //   if(user.firstName){
  //     l1 = user.firstName.charAt(0).toUpperCase();
  //   }
  //   if(user.secondName){
  //     l2 = user.secondName.charAt(0).toUpperCase();
  //   }
  //
  //   return l1+l2;
  // }
}
