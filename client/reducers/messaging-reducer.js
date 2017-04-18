import {
  USER_SENT_FIRST_MESSAGE
} from '../actions/messaging/messagingActionTypes';
import * as helpers from '.././utils-helpers/messaging-helpers';

const initialState = {
  currentMessageThreadName: '',
  currentMessageThread: [],
  allMessageThreads: []
};

export default (state = initialState, action ) => {
  switch (action.type) {
    case USER_SENT_FIRST_MESSAGE:
      console.log('USER_SENT_FIRST_MESSAGE dispatched', action.data);
      const newAllMessageThreads = helpers.addMessageThread(state.allMessageThreads, action.data);
      return {
        currentMessageThreadName: action.data.threadName,
        currentMessageThread: action.data.messages,
        allMessageThreads: newAllMessageThreads
      };
      break;
    default:
      return state;
  }
}