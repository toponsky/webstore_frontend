import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import {
    aAuthActitonTypes,
    AuthActions,
    AuthSuccessAction,
    AuthFailureAction,
    AuthAction
} from './aAuth.actions';


@Injectable()
export class aAuthEffects {
  constructor(private action$: Actions,
              private service: AuthService,
              private router: Router,
              private notificationService: NotificationService) {}

  @Effect() loadingAuth = this.action$.pipe (
    ofType<AuthAction>(aAuthActitonTypes.AUTH),
    mergeMap(
        (data) => this.service.obtainAccessToken(data.payload).
        pipe(
            map(token => {
              if (data.success) { data.success(token['access_token']); }
              this.router.navigate(['/admin/product']);
              this.service.saveToken(token);
              return new AuthSuccessAction(token);
            }),
            catchError(error => {
              if (error.error && error.error.message) {
                this.notificationService.showFailMsg(error.error.message);
              }
              if (data.failure) { data.failure(error); }
              return of(new AuthFailureAction(error));
            }
        )
    )
  ));
}
