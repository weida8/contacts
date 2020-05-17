import {
  LOGING_INITIATED,
  LOGING_SUCCEEDED,
  LOGING_FAILED,
  REGISTRATION_INITIATED,
  REGISTRATION_SUCCEEDED,
  REGISTRATION_FAILED,
} from './types';

const initialState = {
  payload: [],
  isLoading: false,
  loginError: null,
  registrationError: null,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGING_INITIATED:
    case REGISTRATION_INITIATED:
      return {
        ...state,
        isLoading: true,
      };
    case LOGING_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
      };
    case REGISTRATION_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
      };
    case LOGING_FAILED:
      return {
        ...state,
        isLoading: false,
        loginError: action.error,
      };
    case REGISTRATION_FAILED:
      return {
        ...state,
        isLoading: false,
        registrationError: action.error,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
