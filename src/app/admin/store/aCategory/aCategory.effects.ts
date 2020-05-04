import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of, pipe } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { NotificationService } from '../../services/notification.service';
import {
    aCategoryActitonTypes,
    LoadCategoryAction,
    LoadCategorySuccessAction,
    LoadCategoryFailureAction,
    AddCategoryAction,
    AddCategorySuccessAction,
    AddCategoryFailureAction,
    UpdateCategoryAction,
    UpdateCategorySuccessAction,
    UpdateCategoryFailureAction,
    DeleteCategoryAction,
    DeleteCategorySuccessAction,
    DeleteCategoryFailureAction
} from './aCategory.actions';


@Injectable()
export class aCategoryEffects {
  constructor(private action$: Actions,
              private service: CategoryService,
              private notificationService: NotificationService) {}

  @Effect() loadingCategorys = this.action$.pipe (
    ofType<LoadCategoryAction>(aCategoryActitonTypes.LONDING_CATEGORY),
    mergeMap(
        (data) => this.service.list().
        pipe(
            map(items => {
              if (data.success) { data.success(items); }
              return new LoadCategorySuccessAction(items);
            }),
            catchError(error => {
              if (error.error && error.error.message) {
                this.notificationService.showFailMsg(error.error.message);
              }
              if (data.failure) { data.failure(error); }
              return of(new LoadCategoryFailureAction(error));
            }
        )
    )
  ));

  @Effect() addCategory = this.action$.pipe(
    ofType<AddCategoryAction>(aCategoryActitonTypes.ADD_CATEGORY),
    mergeMap(
      (data) => this.service.insert(data.payload).pipe(
        map((item) => {
          if (data.success) { data.success(item); }
          return new AddCategorySuccessAction(item);
        }),
        catchError( error => {
          if (error.error && error.error.message) {
            this.notificationService.showFailMsg(error.error.message);
          }
          if (data.failure) { data.failure(error); }
          return of(new AddCategoryFailureAction(error));
        })
      )
    )
  );

  @Effect() updateCategory = this.action$.pipe(
    ofType<UpdateCategoryAction>(aCategoryActitonTypes.UPDATE_CATEGORY),
    mergeMap(
      (data) => this.service.update(data.payload).pipe(
        map(() => {
          if (data.success) { data.success(data.payload); }
          return new UpdateCategorySuccessAction(data.payload);
        }),
        catchError( error => {
          if (error.error && error.error.message) {
            this.notificationService.showFailMsg(error.error.message);
          }
          if (data.failure) { data.failure(error); }
          return of(new UpdateCategoryFailureAction(error));
        })
      )
    )
  );

  @Effect() deleteCategory = this.action$.pipe(
    ofType<DeleteCategoryAction>(aCategoryActitonTypes.DELETE_CATEGORY),
    mergeMap(
      (data) => this.service.delete(data.payload).pipe(
        map(() => {
          if (data.success) { data.success(data.payload); }
          return new DeleteCategorySuccessAction(data.payload);
        }),
        catchError( error => {
          if (error.error && error.error.message) {
            this.notificationService.showFailMsg(error.error.message);
          }
          if (data.failure) { data.failure(error); }
          return of(new DeleteCategoryFailureAction(error));
        })
      )
    )
  );
}
