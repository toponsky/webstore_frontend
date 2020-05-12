import {Action} from '@ngrx/store';
import {Cart, CartItem} from "./cart.reducer";
import {HttpError} from "../app.reducers";

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const REMOVE_FROM_CART_SUCCESS = 'REMOVE_FROM_CART_SUCCESS';
export const REMOVE_FROM_CART_FAILURE = 'REMOVE_FROM_CART_FAILURE';
export const EMPTY_CART = 'EMPTY_CART';
export const EMPTY_CART_SUCCESS = 'EMPTY_CART_SUCCESS';
export const FETCH_CART = 'FETCH_CART';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const APPLY_DISCOUNT = 'APPLY_DISCOUNT';
export const SET_CART = 'SET_CART';
export const CART_ERROR = 'CART_ERROR';

export const UPDATE_CART_ITEM_AMOUNT = 'UPDATE_CART_ITEM_AMOUNT';
export const UPDATE_CART_ITEM_AMOUNT_SUCCESS = 'UPDATE_CART_ITEM_AMOUNT_SUCCESS';
export const UPDATE_CART_ITEM_AMOUNT_FAILURE = 'UPDATE_CART_ITEM_AMOUNT_FAILURE';

export class AddToCart implements Action {
  readonly type = ADD_TO_CART;

  constructor(public payload: { id: number, amount: string }) {
  }
}


export class SetCart implements Action {
  readonly type = SET_CART;

  constructor(public payload: { cart: Cart, effect: string }) {
  }
}

export class RemoveFromCart implements Action {
  readonly type = REMOVE_FROM_CART;

  constructor(public payload: string) {}
}

export class RemoveFromCartSuccess implements Action {
  readonly type = REMOVE_FROM_CART_SUCCESS;

  constructor(public payload: string) {
  }
}

export class RemoveFromCartFailure implements Action {
  readonly type = REMOVE_FROM_CART_FAILURE;

  constructor(public payload: HttpError) {
  }
}

export class EmptyCart implements Action {
  readonly type = EMPTY_CART;
}

export class EmptyCartSuccess implements Action {
  readonly type = EMPTY_CART_SUCCESS;
}


export class FetchCart implements Action {
  readonly type = FETCH_CART;
}

export class FetchCartSuccess implements Action {
  readonly type = FETCH_CART_SUCCESS;

  constructor(public payload: { cart: Cart, effect: string }) {
  }
}

export class UpdateCartItemAmount implements Action {
  readonly type = UPDATE_CART_ITEM_AMOUNT;
  constructor(public payload: {id: string, amount: number}) {}
}

export class UpdateCartItemAmountSuccess implements Action {
  readonly type = UPDATE_CART_ITEM_AMOUNT_SUCCESS;
  constructor(public payload: { cartItem: CartItem}) {}
}

export class UpdateCartItemAmountFailure implements Action {
  readonly type = UPDATE_CART_ITEM_AMOUNT_FAILURE;
  constructor(public payload: HttpError) {}
}

export class ApplyDiscount implements Action {
  readonly type = APPLY_DISCOUNT;

  constructor(public payload: string) {
  }
}

export class CartError implements Action {
  readonly type = CART_ERROR;

  constructor(public payload: HttpError) {
  }
}


export type CartActions =
            SetCart |
            FetchCart |
            FetchCartSuccess |
            AddToCart |
            RemoveFromCart |
            RemoveFromCartSuccess |
            RemoveFromCartFailure |
            EmptyCart |
            EmptyCartSuccess |
            UpdateCartItemAmount |
            UpdateCartItemAmountSuccess |
            UpdateCartItemAmountFailure |
            ApplyDiscount |
            CartError;
