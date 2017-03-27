import { LOGIN_USER_START } from './authActionTypes';

export const loginUserStart = user => ({
  type: LOGIN_USER_START,
  data: user
});


