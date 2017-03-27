import { LOGIN_USER_START } from '../actions/auth/authActionTypes';

const initialState = {
  isAuth: false,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
    return {
      ...state,
      loading: true
    };
    default:
      return state;
  }
};