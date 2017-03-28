import { USER_SIGN_UP_REQUEST } from '../actions/auth/authActionTypes';

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
        isAuth: action.data.isAuth,
        completedProfile: action.data.completedProfile,
        email: action.data.email
      };
    default:
      return state;
  }
};