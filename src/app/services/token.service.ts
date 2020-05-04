import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";


@Injectable()
export class TokenService {


  url: string = 'http://localhost:5500/v1/oauth/token';

  constructor(private httpClient: HttpClient) {
  }


  obtainAccessToken(email: string, password: string) {
    return this.httpClient.post(this.url, {
      email,
      password
    }, {
      headers: {'Content-type': 'application/json; charset=utf-8'}
    });


  }

  obtainAccessTokenWithRefreshToken(refreshToken: string) {
    let body: HttpParams = new HttpParams();
    body = body.append('refresh_token', refreshToken);
    body = body.append('grant_type', 'refresh_token');
    return this.httpClient.post(this.url, body, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic '
        + btoa("USER_CLIENT_APP" + ':' + "password")
      }
    });

  }

  saveToken(token): void {
    localStorage.setItem('usr', JSON.stringify(token));
  }


  removeToken() {
    localStorage.removeItem('usr');
  }

  getToken() {
    const storageToken = localStorage.getItem('usr');
    let token = '';
    if (storageToken != null || storageToken != undefined) {
      token = JSON.parse(storageToken).access_token;
    }
    return token;
  }

  getRefreshToken() {
    const storageRefreshToken = localStorage.getItem('usr');
    let refreshToken = '';
    if (storageRefreshToken != null || storageRefreshToken != undefined) {
      refreshToken = JSON.parse(storageRefreshToken).refresh_token;
    }
    return refreshToken;
  }

  checkIfTokenExists() {
    return localStorage.getItem('usr') != null || localStorage.getItem('usr') != undefined;
  }
}
