import {
  USER_SIGN_UP_REQUEST,
  USER_COMPLETED_SIGN_UP_REQUEST,
  USER_LOGIN_REQUEST
} from '../actions/auth/authActionTypes';

const initialState = {
  isAuth: false,
  completedProfile: false,
  email: '',
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
        isAuth: true,
        completedProfile: action.data.completedProfile,
        email: action.data.email,
        role: action.data.role,
        industry: action.data.industry,
        project: action.data.project
      };
      return newLoginState;
    default:
      return state;
  }
};