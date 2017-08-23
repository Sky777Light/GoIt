import { Injectable } from '@angular/core';

declare var localStorage;
declare var sessionStorage;
@Injectable()
export class StorageService {

  public get(key: string) {
    return JSON.parse(localStorage.getItem(`goIt:${key}`));
  }

  public set(key: string, value: any) {
    localStorage.setItem(`goIt:${key}`, JSON.stringify(value));
  }

  public remove(key: string) {
    localStorage.removeItem(`goIt:${key}`);
  }

  public getSession(key: string) {
    return JSON.parse(sessionStorage.getItem(`goIt:${key}`));
  }

  public setSession(key: string, value: any) {
    sessionStorage.setItem(`goIt:${key}`, JSON.stringify(value));
  }

  public removeSession(key: string) {
    sessionStorage.removeItem(`goIt:${key}`);
  }
}