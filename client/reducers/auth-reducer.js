import {
  USER_SIGN_UP_REQUEST,
  USER_COMPLETED_SIGN_UP_REQUEST,
  USER_LOGIN_REQUEST
} from '../actions/auth/authActionTypes';

const initialState = {
  isAuth: false,
  completedProfile: false,
  email: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_UP_REQUEST:
      console.log('USER_SIGN_UP_REQUEST dispatched')
      return {
        ...state,
        isAuth: true,
        completedProfile: action.data.completedProfile,
        email: action.data.email
      };
    case USER_COMPLETED_SIGN_UP_REQUEST:
      console.log('USER_COMPLETED_SIGN_UP_REQUEST dispatched')
      return {
        ...state,
        completedProfile: true,
      };
    case USER_LOGIN_REQUEST:
      console.log('USER_LOGIN_REQUEST dispatched')
      return {
        ...state,
        isAuth: true,
        completedProfile: action.data.completedProfile,
        email: action.data.email
      }
    default:
      return state;
  }
};