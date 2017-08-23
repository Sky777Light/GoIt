import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

  constructor(
      private http: Http,
      private storageService: StorageService
  ) {}

  public get(url) {
    return this.http.get(url, new RequestOptions({ headers: this.createAuthorizationHeader() }));
  }

  public post(url, data = {}) {
    return this.http.post(url, data, new RequestOptions({ headers: this.createAuthorizationHeader() }));
  }

  public put(url, data = {}) {
    return this.http.put(url, data, new RequestOptions({ headers: this.createAuthorizationHeader() }));
  }

  public delete(url, data = {}) {
    return this.http.delete(url, new RequestOptions({
      headers: this.createAuthorizationHeader(),
      body: data
    }));
  }

  private createAuthorizationHeader() {
    let headers = new Headers();
    let token = this.storageService.get('token') ||  this.storageService.getSession('token');
    headers.append('Authorization', token);

    return headers;
  }
}
