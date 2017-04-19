import {
  USER_SENT_FIRST_MESSAGE,
  USER_SENT_MESSAGE,
  GET_USER_MESSAGES
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
      const replacedAllMessageThreads = helpers.replaceMessageThread(state.allMessageThreads, action.data);
      return {
        ...state,
        currentMessageThread: action.data.messages,
        allMessageThreads: replacedAllMessageThreads
      };
      break;
    case GET_USER_MESSAGES:
      console.log('GET_USER_MESSAGES dispatched');
      const lastThread = action.data[action.data.length - 1];
      const newCurrentMessageThread = lastThread.messages;
      const newCurrentMessageThreadName = lastThread.threadName;
      let newCurrentMessageThreadUserName;
      if (action.role.Donor) {
        newCurrentMessageThreadUserName = lastThread.nameUserOne;
      } else {
        newCurrentMessageThreadUserName = lastThread.nameUserTwo;
      }
      return {
        ...state,
        currentMessageThreadUserName: newCurrentMessageThreadUserName,
        currentMessageThreadName: newCurrentMessageThreadName,
        currentMessageThread: newCurrentMessageThread,
        allMessageThreads: action.data.reverse()
      };
      break;
    default:
      return state;
  }
}



