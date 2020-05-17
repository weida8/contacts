import { navigate } from '@reach/router';
import {
  LOGING_INITIATED,
  LOGING_SUCCEEDED,
  LOGING_FAILED,
  REGISTRATION_INITIATED,
  REGISTRATION_SUCCEEDED,
  REGISTRATION_FAILED,
} from './types';
import { setCookie } from '../../util/auth';

import { userLoginApi, userRegistrationApi } from '../../api/authentication';

const loginInitiated = () => ({
  type: LOGING_INITIATED,
});
const loginSucceeded = (response) => ({
  type: LOGING_SUCCEEDED,
  payload: response,
});
const loginFailed = (error) => ({
  type: LOGING_FAILED,
  error,
});

export function loginAction(loginPayload) {
  return async (dispatch) => {
    dispatch(loginInitiated());
    try {
      const response = await userLoginApi(loginPayload);
      setCookie('userToken', response.data.token);
      setCookie('userName', response.data.userName);
      navigate('/contacts');
      dispatch(loginSucceeded(response));
      return response;
    } catch (error) {
      dispatch(loginFailed(error.response.data));
      return error;
    }
  };
}

const registrationInitiated = () => ({
  type: REGISTRATION_INITIATED,
});
const registrationSucceeded = (response) => ({
  type: REGISTRATION_SUCCEEDED,
  payload: response,
});
const registrationError = (error) => ({
  type: REGISTRATION_FAILED,
  error,
});

export const registrationAction = (registrationPayload) => async (dispatch) => {
  dispatch(registrationInitiated());
  try {
    const results = await userRegistrationApi(registrationPayload);
    dispatch(registrationSucceeded(results));
  } catch (error) {
    dispatch(registrationError(error));
  }
};
