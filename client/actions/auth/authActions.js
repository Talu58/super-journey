import { USER_SIGN_UP } from './authActionTypes';

export function userSignedUp(user) {
  console.log(user);
  return {
    type: USER_SIGN_UP,
    data: user
  };
}

