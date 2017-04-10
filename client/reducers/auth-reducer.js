import {
  USER_SIGN_UP_REQUEST,
  USER_COMPLETED_SIGN_UP_REQUEST,
  USER_LOGIN_REQUEST,
  USER_AUTHENTICATED,
  USER_LOGOUT,
  USER_GET_INFO_REQUEST
} from '../actions/auth/authActionTypes';

const initialState = {
  isAuth: false,
  completedProfile: false,
  email: '',
  homeIsLoading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_UP_REQUEST:
      console.log('USER_SIGN_UP_REQUEST dispatched');
      return {
        ...state,
        isAuth: true,
        completedProfile: action.data.completedProfile,
        email: action.data.email
      };
    case USER_COMPLETED_SIGN_UP_REQUEST:
      console.log('USER_COMPLETED_SIGN_UP_REQUEST dispatched', action.data);
      const { role, industry, project} = action.data;
      const newState = {
        ...state,
        completedProfile: true,
        role,
        industry,
        project
      };
      return newState;
    case USER_LOGIN_REQUEST:
      console.log('USER_LOGIN_REQUEST dispatched');
      const newLoginState = {
        ...state,
        completedProfile: action.data.completedProfile,
        email: action.data.email,
        role: action.data.role,
        industry: action.data.industry,
        project: action.data.project
      };
      return newLoginState;
    case USER_AUTHENTICATED:
      console.log('USER_AUTHENTICATED dispatched');
      return {
        ...state,
        isAuth: true,
        completedProfile: action.data
      }
    case USER_LOGOUT:
      console.log('USER_LOGOUT dispatched');
      return {
        ...state,
        isAuth: false,
        completedProfile: false
      }
    case USER_GET_INFO_REQUEST:
      console.log('USER_GET_INFO_REQUEST dispatched', action.data);
      return {
        ...state,
        homeIsLoading: false,
        email: action.data.email,
        role: action.data.role,
        industry: action.data.industry,
        project: action.data.project
      }
    default:
      return state;
  }
};