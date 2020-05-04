import { Action } from '@ngrx/store';
import { aProduct } from './aProduct.model';

export enum aProductActitonTypes {
  LONDING_PRODUCT = '[aProduct] Load Admin Product',
  LONDING_PRODUCT_SUCCESS = '[aProduct] Load Admin Product Success',
  LONDING_PRODUCT_FAILURE = '[aProduct] Load Admin Product Failure',
  ADD_PRODUCT = '[aProduct] Add Product',
  ADD_PRODUCT_SUCCESS = '[aProduct] Add Product Success',
  ADD_PRODUCT_FAILURE = '[aProduct] Add Product Failure',
  UPDATE_PRODUCT = '[aProduct] Update Product',
  UPDATE_PRODUCT_SUCCESS = '[aProduct] Update Product Success',
  UPDATE_PRODUCT_FAILURE = '[aProduct] Update Product Failure',
  DELETE_PRODUCT = '[aProduct] Delete Product',
  DELETE_PRODUCT_SUCCESS = '[aProduct] Delete Product Success',
  DELETE_PRODUCT_FAILURE = '[aProduct] Delete Product Failure'
}

// Loading actions
export class LoadProductAction implements Action {
  readonly type: string = aProductActitonTypes.LONDING_PRODUCT;

  constructor(public payload?: string, public success?, public failure?) {}
}

export class LoadProductSuccessAction implements Action {
  readonly type: string = aProductActitonTypes.LONDING_PRODUCT_SUCCESS;

  constructor(public payload: Array<aProduct>) {}
}
export class LoadProductFailureAction implements Action {
  readonly type: string = aProductActitonTypes.LONDING_PRODUCT_FAILURE;

  constructor(public payload: Error) {}
}


// adding actions
export class AddProductAction implements Action {
  readonly type: string = aProductActitonTypes.ADD_PRODUCT;

  constructor(public payload: aProduct, public success?, public failure?) {}
}
export class AddProductSuccessAction implements Action {
  readonly type: string = aProductActitonTypes.ADD_PRODUCT_SUCCESS;

  constructor(public payload: aProduct) {}
}
export class AddProductFailureAction implements Action {
  readonly type: string = aProductActitonTypes.ADD_PRODUCT_FAILURE;

  constructor(public payload: Error) {}
}

// update actions
export class UpdateProductAction implements Action {
  readonly type: string = aProductActitonTypes.UPDATE_PRODUCT;

  constructor(public payload: aProduct, public success?, public failure?) {}
}
export class UpdateProductSuccessAction implements Action {
  readonly type: string = aProductActitonTypes.UPDATE_PRODUCT_SUCCESS;

  constructor(public payload: aProduct) {}
}
export class UpdateProductFailureAction implements Action {
  readonly type: string = aProductActitonTypes.UPDATE_PRODUCT_FAILURE;

  constructor(public payload: Error) {}
}


// delete actions
export class DeleteProductAction implements Action {
  readonly type: string = aProductActitonTypes.DELETE_PRODUCT;

  constructor(public payload: string, public success?, public failure?) {}
}
export class DeleteProductSuccessAction implements Action {
  readonly type: string = aProductActitonTypes.DELETE_PRODUCT_SUCCESS;

  constructor(public payload: string) {}
}
export class DeleteProductFailureAction implements Action {
  readonly type: string = aProductActitonTypes.DELETE_PRODUCT_FAILURE;

  constructor(public payload: string) {}
}


export type aProductAction =
      LoadProductAction |
      LoadProductSuccessAction |
      LoadProductFailureAction |
      AddProductAction |
      AddProductSuccessAction |
      AddProductFailureAction |
      UpdateProductAction |
      UpdateProductSuccessAction |
      UpdateProductFailureAction |
      DeleteProductAction |
      DeleteProductSuccessAction |
      DeleteProductFailureAction;
