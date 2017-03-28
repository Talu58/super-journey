import { USER_SIGN_UP } from '../actions/auth/authActionTypes';

const initialState = {
  isAuth: false,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_UP:
    return {
      ...state,
      loading: true
    };
    default:
      return state;
  }
};