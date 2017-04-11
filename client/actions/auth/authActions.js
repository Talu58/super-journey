import { 
  USER_SIGN_UP_REQUEST,
  USER_COMPLETED_SIGN_UP_REQUEST,
  USER_LOGIN_REQUEST,
  USER_AUTHENTICATED,
  USER_LOGOUT,
  USER_GET_INFO_REQUEST,
  USER_UPLOADED_IMAGE
} from './authActionTypes';
import * as authentication from '../../utils-api/auth/authentication-rest-api';
import setAuthorizationToken from '../../utils-api/auth/authentication-set-token';
import jwt from 'jsonwebtoken';
import { getUserMatches, reinitializeSearchState } from '../search/searchActions';


export function userSignUpRequest(user) {
  return dispatch => {
    return authentication.signUpRequest(user)
      .then( userInfo => {
        const token = userInfo.data.token
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(authenticateUser(jwt.decode(token)));
        dispatch({
          type: USER_SIGN_UP_REQUEST,
          data: userInfo.data
        })
      }).catch(err => {
        console.log('userSignUpRequest err', err);
      });
  };
};

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
};

export function userUploadedImage(file) {
  return dispatch => {
    return authentication.uploadImage(file)
      .then( message => {
        console.log('userUploadedImage message', message);
        dispatch({
          type: USER_UPLOADED_IMAGE,
          data: file
        })
      }).catch(err => {
        console.log('userUploadedImage err', err);
      });
  };
};

export function userLoginRequest(user) {
  return dispatch => {
    console.log('user', user);
    return authentication.loginRequest(user)
      .then( userInfo => {
        const token = userInfo.data.token
        localStorage.setItem('jwtToken', token);
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
};

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch({
      type: USER_LOGOUT
    });
    dispatch(reinitializeSearchState());
  };
};

export function getUserInformation(userEmail) {
  return dispatch => {
    return authentication.getUserInfo(userEmail)
      .then(userInfo => {
        const { email, role, industry, project, completedProfile } = userInfo.data;
        let newUser = {
          email,
          role,
          industry,
          project,
          completedProfile
        };
        dispatch({
          type: USER_GET_INFO_REQUEST,
          data: newUser
        });
        dispatch(getUserMatches(userInfo.data));
      });
  };
};

export function loginDemoUser(userInfo) {
  return dispatch => {
    const token = userInfo.data.token
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch({
      type: USER_LOGIN_REQUEST,
      data: userInfo.data
    })
    dispatch(authenticateUser(jwt.decode(token)));
  };
};

