import {
  USER_SENT_FIRST_MESSAGE,
  USER_SENT_MESSAGE
} from '../actions/messaging/messagingActionTypes';
import * as helpers from '.././utils-helpers/messaging-helpers';

const initialState = {
  currentMessageThreadUserName: '',
  currentMessageThreadName: '',
  currentMessageThread: [],
  allMessageThreads: []
};

export default (state = initialState, action ) => {
  switch (action.type) {
    case USER_SENT_FIRST_MESSAGE:
      console.log('USER_SENT_FIRST_MESSAGE dispatched');
      const newAllMessageThreads = helpers.addMessageThread(state.allMessageThreads, action.data);
      return {
        currentMessageThreadUserName: action.data.nameUserOne,
        currentMessageThreadName: action.data.threadName,
        currentMessageThread: action.data.messages,
        allMessageThreads: newAllMessageThreads
      };
      break;
    case USER_SENT_MESSAGE:
      console.log('USER_SENT_MESSAGE dispatched');
      return {
        ...state
      };
      break;
    default:
      return state;
  }
}



