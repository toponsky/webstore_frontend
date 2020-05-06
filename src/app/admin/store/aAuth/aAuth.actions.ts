import {Action} from '@ngrx/store';
import {aAuth} from './aAuth.model';

export enum aAuthActitonTypes {
  AUTH = '[ADMIN AUTH] Admin Auth',
  AUTH_SUCCESS = '[ADMIN AUTH] Admin Auth success',
  AUTH_FAILURE = '[ADMIN AUTH] Admin Auth failure'
}

export class AuthAction implements Action {
  readonly type = aAuthActitonTypes.AUTH;
  constructor(public payload: aAuth, public success?, public failure?) {}
}

export class AuthSuccessAction implements Action {
  readonly type = aAuthActitonTypes.AUTH_SUCCESS;
  constructor(public payload: string, public success?, public failure?) {}
}

export class AuthFailureAction implements Action {
  readonly type = aAuthActitonTypes.AUTH_FAILURE;
  constructor(public payload: Error, public success?, public failure?) {}
}

export type AuthActions = AuthAction | AuthSuccessAction | AuthFailureAction;
