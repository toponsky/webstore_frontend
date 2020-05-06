import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {aAuth} from '../store/aAuth/aAuth.model';


@Injectable()
export class AuthService {


  url = 'http://localhost:5500/v1/admin/token';

  constructor(private httpClient: HttpClient) {
  }

  obtainAccessToken(auth: aAuth) {
    return this.httpClient.post<string>(this.url, {
      email: auth.email,
      password: auth.password
    }, {
      headers: {'Content-type': 'application/json; charset=utf-8'}
    });
  }

  saveToken(token): void {
    localStorage.setItem('admin_usr', JSON.stringify(token));
  }


  removeToken() {
    localStorage.removeItem('admin_usr');
  }

  getToken() {
    const storageToken = localStorage.getItem('admin_usr');
    let token = '';
    if (storageToken != null || storageToken != undefined) {
      token = JSON.parse(storageToken).access_token;
    }
    return token;
  }

  getRefreshToken() {
    const storageRefreshToken = localStorage.getItem('admin_usr');
    let refreshToken = '';
    if (storageRefreshToken != null || storageRefreshToken != undefined) {
      refreshToken = JSON.parse(storageRefreshToken).refresh_token;
    }
    return refreshToken;
  }

  checkIfTokenExists() {
    return localStorage.getItem('admin_usr') != null || localStorage.getItem('admin_usr') != undefined;
  }
}
