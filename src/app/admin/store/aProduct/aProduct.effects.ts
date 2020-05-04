import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of, pipe } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';
import {
    aProductActitonTypes,
    LoadProductAction,
    LoadProductSuccessAction,
    LoadProductFailureAction,
    AddProductAction,
    AddProductSuccessAction,
    AddProductFailureAction,
    UpdateProductAction,
    UpdateProductSuccessAction,
    UpdateProductFailureAction,
    DeleteProductAction,
    DeleteProductSuccessAction,
    DeleteProductFailureAction
} from './aProduct.actions';


@Injectable()
export class aProductEffects {
  constructor(private action$: Actions,
              private service: ProductService,
              private notificationService: NotificationService) {}

  @Effect() loadingProducts = this.action$.pipe (
    ofType<LoadProductAction>(aProductActitonTypes.LONDING_PRODUCT),
    mergeMap(
        (data) => this.service.list().
        pipe(
            map(items => {
              if (data.success) { data.success(items); }
              return new LoadProductSuccessAction(items);
            }),
            catchError(error => {
              if (error.error && error.error.message) {
                this.notificationService.showFailMsg(error.error.message);
              }
              if (data.failure) { data.failure(error); }
              return of(new LoadProductFailureAction(error));
            }
        )
    )
  ));

  @Effect() addProduct = this.action$.pipe(
    ofType<AddProductAction>(aProductActitonTypes.ADD_PRODUCT),
    mergeMap(
      (data) => this.service.insert(data.payload).pipe(
        map((item) => {
          if (data.success) { data.success(item); }
          return new AddProductSuccessAction(item);
        }),
        catchError( error => {
          if (error.error && error.error.message) {
            this.notificationService.showFailMsg(error.error.message);
          }
          if (data.failure) { data.failure(error); }
          return of(new AddProductFailureAction(error));
        })
      )
    )
  );

  @Effect() updateProduct = this.action$.pipe(
    ofType<UpdateProductAction>(aProductActitonTypes.UPDATE_PRODUCT),
    mergeMap(
      (data) => this.service.update(data.payload).pipe(
        map(() => {
          if (data.success) { data.success(data.payload); }
          return new UpdateProductSuccessAction(data.payload);
        }),
        catchError( error => {
          if (error.error && error.error.message) {
            this.notificationService.showFailMsg(error.error.message);
          }
          if (data.failure) { data.failure(error); }
          return of(new UpdateProductFailureAction(error));
        })
      )
    )
  );

  @Effect() deleteProduct = this.action$.pipe(
    ofType<DeleteProductAction>(aProductActitonTypes.DELETE_PRODUCT),
    mergeMap(
      (data) => this.service.delete(data.payload).pipe(
        map(() => {
          if (data.success) { data.success(data.payload); }
          return new DeleteProductSuccessAction(data.payload);
        }),
        catchError( error => {
          if (error.error && error.error.message) {
            this.notificationService.showFailMsg(error.error.message);
          }
          if (data.failure) { data.failure(error); }
          return of(new DeleteProductFailureAction(error));
        })
      )
    )
  );
}