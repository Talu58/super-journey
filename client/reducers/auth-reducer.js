import {
  USER_SIGN_UP_REQUEST,
  USER_COMPLETED_SIGN_UP_REQUEST,
  USER_LOGIN_REQUEST,
  USER_AUTHENTICATED,
  USER_LOGOUT,
  USER_GET_INFO_REQUEST,
  USER_UPLOADED_IMAGE,
  EDIT_ORGANIZATION_INFORMATION
} from '../actions/auth/authActionTypes';

const initialState = {
  isAuth: false,
  completedProfile: false,
  email: '',
  firstname: '',
  lastname: '',
  homeIsLoading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_UP_REQUEST:
      return {
        ...state,
        isAuth: true,
        completedProfile: action.data.completedProfile,
        email: action.data.email,
        firstname: action.data.firstname,
        lastname: action.data.lastname
      };
      break;
    case USER_COMPLETED_SIGN_UP_REQUEST:
      const { role, industry, organization} = action.data;
      const newState = {
        ...state,
        completedProfile: true,
        role,
        industry,
        organization
      };
      return newState;
      break;
    case USER_UPLOADED_IMAGE:
      return {
        ...state
      };
      break;
    case USER_LOGIN_REQUEST:
      const newLoginState = {
        ...state,
        completedProfile: action.data.completedProfile,
        email: action.data.email,
        role: action.data.role,
        industry: action.data.industry,
        organization: action.data.organization,
        firstname: action.data.firstname,
        lastname: action.data.lastname
      };
      return newLoginState;
      break;
    case USER_AUTHENTICATED:
      return {
        ...state,
        isAuth: true,
        completedProfile: action.data
      };
      break;
    case USER_LOGOUT:
      return {
        ...state,
        isAuth: false,
        completedProfile: false
      };
      break;
    case USER_GET_INFO_REQUEST:
      return {
        ...state,
        homeIsLoading: false,
        email: action.data.email,
        role: action.data.role,
        industry: action.data.industry,
        organization: action.data.organization,
        completedProfile: action.data.completedProfile,
        firstname: action.data.firstname,
        lastname: action.data.lastname
      };
      break;
    case EDIT_ORGANIZATION_INFORMATION:
      return {
        ...state,
        organization: action.data
      };
      break;
    default:
      return state;
  }
};