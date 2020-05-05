import { aProductStatus } from './aProduct.model';
import { aProductAction, aProductActitonTypes } from './aProduct.actions';


const initialStatus: aProductStatus = {
  list: [],
  loading: false,
  error: null
};

export function aProductReduecer(state: aProductStatus = initialStatus, action: aProductAction) {
  switch(action.type) {
    case aProductActitonTypes.LONDING_PRODUCT:
      return {
        ... state,
        loading: true
      };
    case aProductActitonTypes.LONDING_PRODUCT_SUCCESS:
      return {
        ... state,
        list: action.payload,
        loading: false
      };

    case aProductActitonTypes.LONDING_PRODUCT_FAILURE:
      return {
        ... state,
        error: action.payload,
        loading: false
      };

    case aProductActitonTypes.ADD_PRODUCT:
      return {
        ...state,
        loading: true
      };
    case aProductActitonTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false
      };
    case aProductActitonTypes.ADD_PRODUCT_FAILURE:
      return {
        ... state,
        error: action.payload,
        loading: false
      };

    case aProductActitonTypes.UPDATE_PRODUCT:
      return {
        ...state,
        loading: true
      };
    case aProductActitonTypes.UPDATE_PRODUCT_SUCCESS:
      debugger
      let item = state.list.find(ele => ele['_id'] === action.payload['_id']);
      Object.assign(item, action.payload);
      return {
        ...state,
        list:[...state.list],
        loading: false,
      };

    case aProductActitonTypes.UPDATE_PRODUCT_FAILURE:
      return {
        ... state,
        error: action.payload,
        loading: false
      };

    case aProductActitonTypes.DELETE_PRODUCT:
      return {
        ...state,
        loading: true
      };
    case aProductActitonTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        list: state.list.filter(item => item['_id'] !== action.payload),
        loading: false
      };

    case aProductActitonTypes.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state;
  }
}