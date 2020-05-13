import { aAuth, aAuthStatus } from './aAuth.model';
import { aAuthActitonTypes, AuthActions } from './aAuth.actions';


const initialStatus: aAuthStatus = {
  authAdmin: false,
  token: '',
  loading: false,
  error: null
};

export function aAuthReduecer(state: aAuthStatus = initialStatus, action: AuthActions) {
  switch(action.type) {
    case aAuthActitonTypes.AUTH:
      return {
        ... state,
        loading: true
      };
    case aAuthActitonTypes.AUTH_SUCCESS:
      return {
        ... state,
        authAdmin: true,
        token: action.payload,
        loading: false
      };

    case aAuthActitonTypes.AUTH_FAILURE:
      return {
        ... state,
        authAdmin: false,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
}