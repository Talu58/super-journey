import { 
  USER_SIGN_UP_REQUEST,
  USER_COMPLETED_SIGN_UP_REQUEST,
  USER_LOGIN_REQUEST,
  USER_AUTHENTICATED,
  USER_LOGOUT
} from './authActionTypes';
import * as authentication from '../../utils-api/auth/authentication-rest-api';
import setAuthorizationToken from '../../utils-api/auth/authentication-set-token';
import jwt from 'jsonwebtoken';

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
        console.log('jwt', jwt.decode(token));
        setAuthorizationToken(token);
        dispatch({
          type: USER_LOGIN_REQUEST,
          data: userInfo.data
        })
        dispatch(authenticateUser(jwt.decode(token)));
      }).catch(err => {
        console.log('userLoginRequest err', err);
      });
  };
};

export function authenticateUser({ completedProfile }) {
  return {
        type: USER_AUTHENTICATED,
        data: completedProfile
    };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch({
      type: USER_LOGOUT
    });
  }
}
