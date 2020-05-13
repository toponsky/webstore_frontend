import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {BehaviorSubject, of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

import { aAuthState } from '../store/aAuth/aAuth.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ATokenInterceptor implements HttpInterceptor {

  isRefreshingToken:boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private store: Store<aAuthState>, private tokenService: AuthService, private router: Router) {
  }

  addTokenToHeader(request: HttpRequest<any>, token): HttpRequest<any> {
    if (token != null) {
      return request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token.access_token
        }
      });
    }
    return request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.tokenService.getToken()
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    if (!request.url.includes('v1/admin/token') && request.url.includes('/admin/')) {
      if (!this.tokenService.getToken()) {
        this.router.navigate(['/admin/login']);
      } else {
        return next.handle(this.addTokenToHeader(request, null)).pipe(catchError(
          error => {
            this.router.navigate(['/admin/login']);
            return throwError(error);
          }
        ));
      }
    } else {
      return next.handle(request);
    }
  }

}
