import { USER_SIGN_UP } from './authActionTypes';
import * as authentication from '../../api-utils/auth/authentication-rest-api';

export function userSignedUp(user) {
  return dispatch => {
    authentication.signUp(user)
      .then( userInfo => {
        dispatch({
          type: USER_SIGN_UP,
          data: userInfo
        })
      });
  };
}

