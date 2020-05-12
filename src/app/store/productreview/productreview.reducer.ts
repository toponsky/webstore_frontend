import * as ProductReviewActions from './productreview.actions';

import { ProductReview } from './productreview.actions';
import { HttpError } from '../app.reducers';

export interface State {
  list: ProductReview[];
  loading: boolean;
};

const initialState: State = {
  list: [],
  loading: false
};

export function ProductReviewReducer(state = initialState, action: ProductReviewActions.ProductReviewActions) {
  switch (action.type) {
    case(ProductReviewActions.FETCH_PRODUCT_REVIEW):
      return {
        ...state,
        loading: true
      };
    case(ProductReviewActions.FETCH_PRODUCT_REVIEW_SUCCESS):
      state.list = action.payload;
      return {
        ...state,
        loading: false
      };

    case(ProductReviewActions.FETCH_PRODUCT_REVIEW_FAILURE):

    case(ProductReviewActions.ADD_PRODUCT_REVIEW):
      return {
        ...state,
        loading: true
      };
    case(ProductReviewActions.ADD_PRODUCT_REVIEW_SUCCESS):
      return {
        list: [action.payload, ...state.list ],
        loading: false
      };

    case(ProductReviewActions.FETCH_PRODUCT_REVIEW_FAILURE):
    default:
        return state;
  }
}
