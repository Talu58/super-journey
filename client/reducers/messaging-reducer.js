import {
  USER_SENT_FIRST_MESSAGE
} from '../actions/messaging/messagingActionTypes';

const initialState = {

};

export default (state = initialState, action ) => {
  switch (action.type) {
    case USER_SENT_FIRST_MESSAGE:
      console.log('USER_SENT_FIRST_MESSAGE dispatched');
      return {
        ...state
      };
      break;
    default:
      return state;
  }
}