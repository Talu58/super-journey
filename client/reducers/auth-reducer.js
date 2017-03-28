import { USER_SIGN_UP } from '../actions/auth/authActionTypes';

const initialState = {
  isAuth: false,
  completedProfile: false,
  email: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_UP:
      console.log('got here');
      return {
        ...state,
      };
    default:
      return state;
  }
};