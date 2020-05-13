import * as CartActions from './cart.actions';
import { HttpError } from '../app.reducers';


export interface Category {
  id: string;
  name: string;
}

export interface Product {
  cartDesc: string;
  id: number;
  image: string;
  images: string;
  live: number;
  details: string;
  shortDesc: string;
  longDesc: string;
  name: string;
  price: number;
  cargoPrice: number;
  taxPercent: number;
  productCategory: {
    name: string,
    id: number
  };
  sku: string;
  stock: number;
  unlimited: number;
}

export interface ProductDisplay {
  id: number;
  name: string;
  price: number;
  cargoPrice: number;
  productCategory: {
    name: string,
    id: number
  };
  thumb: string;
}

export interface Discount {
  id: number;
  code: string;
  discountPercent: number;
}

export interface CartItem {
  id: number;
  cartProduct: ProductDisplay;
  amount: number;
}

export interface Cart {
  id: number;
  cartItemList: any[];
  cartDiscount: Discount;
  totalPrice: number;
  totalCargoPrice: number;
}


export interface State {
  cart: Cart;
  errors: HttpError[];
  loading: boolean;
  fetchLoading: boolean;
}

const initialState: State = {
  cart: {
    id: null,
    cartItemList: [],
    cartDiscount: null,
    totalPrice: 0,
    totalCargoPrice: 0,
  },
  errors: [],
  loading: false,
  fetchLoading: false // cart fetch loading is different because it exists solely on the header
};

export function cartReducer(state = initialState, action: CartActions.CartActions) {
  switch (action.type) {
    case(CartActions.FETCH_CART):
      return {
        ...state,
        fetchLoading: true
      };

    case (CartActions.FETCH_CART_SUCCESS):
      let fetchErrorClear = state.errors;
      for (let i = 0; i < fetchErrorClear.length; i++) {
        if (fetchErrorClear[i].errorEffect === action.payload.effect) {
          fetchErrorClear = fetchErrorClear.splice(i, 1);
        }
      }
      if (action.payload.cart == null || action.payload.cart === undefined) {
        return {
          cart: {
            id: null,
            cartItemList: [],
            cartDiscount: null,
            totalPrice: 0,
            totalCargoPrice: 0,
          },
          errors: fetchErrorClear,
          loading: state.loading,
          fetchLoading: false
        };
      }
      return {
        cart: action.payload.cart,
        errors: fetchErrorClear,
        loading: state.loading,
        fetchLoading: false
      };

    case(CartActions.REMOVE_FROM_CART):
      return {
        ...state,
        loading: true
      };
    case(CartActions.REMOVE_FROM_CART_SUCCESS):
      state.cart.cartItemList = state.cart.cartItemList.filter(ele => ele.id !== action.payload);
      state.cart.totalPrice = _updateCartTotalPrice(state.cart);
      return {
        ...state,
        loading: false
      };
    case(CartActions.REMOVE_FROM_CART_FAILURE):
      const removeFromCartFailureErrors: HttpError[] = state.errors;
      for (let i = 0; i < removeFromCartFailureErrors.length; i++) {
        if (removeFromCartFailureErrors[i].errorEffect === action.payload.errorEffect) {
          removeFromCartFailureErrors[i] = action.payload;
          return {
            ...state,
            errors: removeFromCartFailureErrors,
            loading: false
          };
        }
      }
      removeFromCartFailureErrors.push(action.payload);
      return {
        ...state,
        errors: removeFromCartFailureErrors,
        loading: false
      };

    case(CartActions.ADD_TO_CART):
    case(CartActions.APPLY_DISCOUNT):
      return {
        ...state,
        loading: true
      };

    case(CartActions.UPDATE_CART_ITEM_AMOUNT):
      return  {
        ...state,
        loading: false
      };

    case(CartActions.UPDATE_CART_ITEM_AMOUNT_SUCCESS):
    debugger
      state.cart.cartItemList.find(ele => ele.id === action.payload['_id']).amount = action.payload['amount'];
      debugger
      state.cart.totalPrice = _updateCartTotalPrice(state.cart);
      return {
        ...state,
        loading: false,
      };

    case(CartActions.UPDATE_CART_ITEM_AMOUNT_FAILURE):
      const errors: HttpError[] = state.errors;
      for (let i = 0; i < errors.length; i++) {
        if (errors[i].errorEffect === action.payload.errorEffect) {
          errors[i] = action.payload;
          return {
            ...state,
            errors,
            loading: false
          };
        }
      }
      errors.push(action.payload);
      return {
        ...state,
        errors,
        loading: false
      };
    case (CartActions.SET_CART):
      let cartErrorClear = state.errors;
      for (let i = 0; i < cartErrorClear.length; i++) {
        if (cartErrorClear[i].errorEffect === action.payload.effect) {
          cartErrorClear = cartErrorClear.splice(i, 1);
        }
      }
      if (action.payload.cart == null || action.payload.cart === undefined) {
        return {
          cart: {
            id: null,
            cartItemList: [],
            cartDiscount: null,
            totalPrice: 0,
            totalCargoPrice: 0,
          },
          errors: cartErrorClear,
          loading: false,
          fetchLoading: state.fetchLoading
        };
      }
      return {
        cart: action.payload.cart,
        errors: cartErrorClear,
        loading: false,
        fetchLoading: state.fetchLoading
      };
    case(CartActions.CART_ERROR):
      const error: HttpError[] = state.errors;
      for (let i = 0; i < error.length; i++) {
        if (error[i].errorEffect === action.payload.errorEffect) {
          error[i] = action.payload;
          return {
            ...state,
            errors: error,
            loading: false
          };
        }
      }
      error.push(action.payload);
      return {
        ...state,
        errors: error,
        loading: false
      };

    case(CartActions.EMPTY_CART_SUCCESS):
      return initialState;

    default:
      return state;
  }
}

function _updateCartTotalPrice(cart: Cart) {
  let totalPrice = 0;

  cart.cartItemList.forEach(cartItem =>{
    totalPrice += cartItem.cartProduct.price * cartItem.amount;
  });

  totalPrice += cart.totalCargoPrice;
  return  totalPrice;
}
