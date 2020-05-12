import {Action} from '@ngrx/store';

import { HttpError } from '../app.reducers';

export interface StarRating {
  OneStar: number;
  OneStarPer: number;
  TwoStar: number;
  TwoStarPer: number;
  ThreeStar: number;
  ThreeStarPer: number;
  FourStar: number;
  FourStarPer: number;
  FiveStar: number;
  FiveStarPer: number;
  SumSart: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  custName: string;
  date: Date;
  comment: string;
  rating: number;
}

export const ADD_PRODUCT_REVIEW = 'ADD_PRODUCT_REVIEW';
export const ADD_PRODUCT_REVIEW_SUCCESS = 'ADD_PRODUCT_REVIEW_SUCCESS';
export const ADD_PRODUCT_REVIEW_FAILURE = 'ADD_PRODUCT_REVIEW_FAILURE';

export const FETCH_PRODUCT_REVIEW = 'FETCH_PRODUCT_REVIEW';
export const FETCH_PRODUCT_REVIEW_SUCCESS = 'FETCH_PRODUCT_REVIEW_SUCCESS';
export const FETCH_PRODUCT_REVIEW_FAILURE = 'FETCH_PRODUCT_REVIEW_FAILURE';


export class FetchProductReview implements Action {
  readonly type = FETCH_PRODUCT_REVIEW;

  constructor(public payload: string) {}
}

export class FetchProductReviewSuccess implements Action {
  readonly type = FETCH_PRODUCT_REVIEW_SUCCESS;

  constructor(public payload: ProductReview[]) {}
}

export class FetchProductReviewFailure implements Action {
  readonly type = FETCH_PRODUCT_REVIEW_FAILURE;

  constructor(public payload: HttpError) {}
}


export class AddProductView implements Action {
  readonly type = ADD_PRODUCT_REVIEW;

  constructor(public payload: ProductReview) {}
}

export class AddProductViewSuccess implements Action {
  readonly type = ADD_PRODUCT_REVIEW_SUCCESS;

  constructor(public payload: ProductReview) {}
}

export class AddProductViewFailure implements Action {
  readonly type = ADD_PRODUCT_REVIEW_FAILURE;

  constructor(public payload: HttpError) {}
}


export type ProductReviewActions = FetchProductReview |
                          FetchProductReviewSuccess |
                          FetchProductReviewFailure |
                          AddProductView |
                          AddProductViewSuccess |
                          AddProductViewFailure;
