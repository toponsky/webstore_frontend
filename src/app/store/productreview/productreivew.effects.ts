import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap,  } from 'rxjs/operators';

import * as ProductReviewActions from './productreview.actions';
import { ProductService } from '../../services/product.service';


@Injectable()
export class ProductReviewEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private router: Router
   ) {}

   @Effect()
  fetchProductReview = this.actions$.pipe(
    ofType(ProductReviewActions.FETCH_PRODUCT_REVIEW),
    switchMap((action: ProductReviewActions.FetchProductReview) => {
      return this.productService.getProductReview(action.payload).pipe(
        map((res) => {
          return {
            type: ProductReviewActions.FETCH_PRODUCT_REVIEW_SUCCESS,
            payload: res,
          };
        }),
        catchError((error) => {
          return of(
            new ProductReviewActions.FetchProductReviewFailure({
              error,
              errorEffect: ProductReviewActions.FETCH_PRODUCT_REVIEW,
            })
          );
        })
      );
    })
  );
  @Effect()
  addProductionReview = this.actions$.pipe(
    ofType(ProductReviewActions.ADD_PRODUCT_REVIEW),
    switchMap((action: ProductReviewActions.AddProductView) => {
      return this.productService.addProductReview(action.payload).pipe(
        map((res) => {
          return {
            type: ProductReviewActions.ADD_PRODUCT_REVIEW_SUCCESS,
            payload: res,
          };
        }),
        catchError((error) => {
          return of(
            new ProductReviewActions.AddProductViewFailure({
              error,
              errorEffect: ProductReviewActions.ADD_PRODUCT_REVIEW,
            })
          );
        })
      );
    })
  );
}
