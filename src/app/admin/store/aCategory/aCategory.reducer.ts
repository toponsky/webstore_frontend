import { aCategoryStatus } from './aCategory.model';
import { aCategoryAction, aCategoryActitonTypes } from './aCategory.actions';


const initialStatus: aCategoryStatus = {
  list: [],
  loading: false,
  error: null
};

export function aCategoryReduecer(state: aCategoryStatus = initialStatus, action: aCategoryAction) {
  switch(action.type) {
    case aCategoryActitonTypes.LONDING_CATEGORY:
      return {
        ... state,
        loading: true
      };
    case aCategoryActitonTypes.LONDING_CATEGORY_SUCCESS:
      return {
        ... state,
        list: action.payload,
        loading: false
      };

    case aCategoryActitonTypes.LONDING_CATEGORY_FAILURE:
      return {
        ... state,
        error: action.payload,
        loading: false
      };

    case aCategoryActitonTypes.ADD_CATEGORY:
      return {
        ...state,
        loading: true
      };
    case aCategoryActitonTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false
      };
    case aCategoryActitonTypes.ADD_CATEGORY_FAILURE:
      return {
        ... state,
        error: action.payload,
        loading: false
      };

    case aCategoryActitonTypes.UPDATE_CATEGORY:
      return {
        ...state,
        loading: true
      };
    case aCategoryActitonTypes.UPDATE_CATEGORY_SUCCESS:
      state.list.find(ele => ele._id === action.payload['_id']).name = action.payload['name'];
      return {
        ...state,
        list:[...state.list],
        loading: false,
      };

    case aCategoryActitonTypes.UPDATE_CATEGORY_FAILURE:
      return {
        ... state,
        error: action.payload,
        loading: false
      };

    case aCategoryActitonTypes.DELETE_CATEGORY:
      return {
        ...state,
        loading: true
      };
    case aCategoryActitonTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        list: state.list.filter(item => item._id !== action.payload),
        loading: false
      };

    case aCategoryActitonTypes.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state;
  }
}