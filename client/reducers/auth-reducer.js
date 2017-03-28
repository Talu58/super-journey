import { USER_SIGN_UP } from '../actions/auth/authActionTypes';

const initialState = {
  isAuth: false,
  completedProfile: false,
  email: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_UP:
      console.log('USER_SIGN_UP dispatched')
      return {
        ...state,
        isAuth: true,
        completedProfile: action.data.completedProfile,
        email: action.data.email
      };
    default:
      return state;
  }
};