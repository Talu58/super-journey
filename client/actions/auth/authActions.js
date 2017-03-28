import { USER_SIGN_UP_REQUEST } from './authActionTypes';
import * as authentication from '../../api-utils/auth/authentication-rest-api';

export function userSignedUpRequest(user) {
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

