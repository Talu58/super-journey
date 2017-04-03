import { 
  USER_SIGN_UP_REQUEST,
  USER_COMPLETED_SIGN_UP_REQUEST,
  USER_LOGIN_REQUEST 
} from './authActionTypes';
import * as authentication from '../../utils-api/auth/authentication-rest-api';

export function userSignUpRequest(user) {
  return dispatch => {
    return authentication.signUpRequest(user)
      .then( userInfo => {
        dispatch({
          type: USER_SIGN_UP_REQUEST,
          data: userInfo.data
        })
      });
  };
}

export function userCompletedSignUpRequest(user) {
  return dispatch => {
    return authentication.completedSignUpRequest(user)
      .then( userInfo => {
        dispatch({
          type: USER_COMPLETED_SIGN_UP_REQUEST,
          data: userInfo
        })
        return userInfo.data;
      });
  };
}

export function userLoginRequest(user) {
  return dispatch => {
    return authentication.loginRequest(user)
      .then( userInfo => {
        dispatch({
          type: USER_LOGIN_REQUEST,
          data: userInfo.data
        })
      });
  };
}