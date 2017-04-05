import { 
  USER_SIGN_UP_REQUEST,
  USER_COMPLETED_SIGN_UP_REQUEST,
  USER_LOGIN_REQUEST,
  USER_AUTHENTICATED
} from './authActionTypes';
import * as authentication from '../../utils-api/auth/authentication-rest-api';
import setAuthorizationToken from '../../utils-api/auth/authentication-set-token';

export function userSignUpRequest(user) {
  return dispatch => {
    return authentication.signUpRequest(user)
      .then( userInfo => {
        dispatch({
          type: USER_SIGN_UP_REQUEST,
          data: userInfo.data
        })
      }).catch(err => {
        console.log('userSignUpRequest err', err);
      });
  };
}

export function userCompletedSignUpRequest(user) {
  return dispatch => {
    return authentication.completedSignUpRequest(user)
      .then( userInfo => {
        dispatch({
          type: USER_COMPLETED_SIGN_UP_REQUEST,
          data: user
        })
      }).catch(err => {
        console.log('userCompletedSignUpRequest err', err);
      });
  };
}

export function userLoginRequest(user) {
  return dispatch => {
    return authentication.loginRequest(user)
      .then( userInfo => {
        console.log('userLoginRequest userInfo', userInfo);
        const token = userInfo.data.token
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch({
          type: USER_LOGIN_REQUEST,
          data: userInfo.data
        })
        dispatch(authenticateUser());
      }).catch(err => {
        console.log('userLoginRequest err', err);
      });
  };
};

export function authenticateUser() {
  return {
        type: USER_AUTHENTICATED,
    };
}
