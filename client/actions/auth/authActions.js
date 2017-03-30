import { USER_SIGN_UP_REQUEST, USER_COMPLETED_SIGN_UP_REQUEST } from './authActionTypes';
import * as authentication from '../../api-utils/auth/authentication-rest-api';

export function userSignUpRequest(user) {
  return dispatch => {
    return authentication.signUpRequest(user)
      .then( userInfo => {
        dispatch({
          type: USER_SIGN_UP_REQUEST,
          data: userInfo
        })
        return userInfo.data;
      });
  };
}

export function userCompletedSignUpRequest(user) {
  console.log('usercompletedSignUpRequest');
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
