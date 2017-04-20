import {
  USER_SENT_FIRST_MESSAGE,
  USER_SENT_MESSAGE,
  GET_USER_MESSAGES,
  USER_CHANGED_CURRENT_THREAD,
  NEW_MESSAGE_RECEIVED
} from '../actions/messaging/messagingActionTypes';
import * as helpers from '.././utils-helpers/messaging-helpers';

const initialState = {
  currentMessageThreadUserName: '',
  currentMessageThreadName: '',
  currentMessageThread: [],
  allMessageThreads: []
};

export default (state = initialState, action ) => {
  let newCurrentMessageThreadUserName;
  let newCurrentMessageThread;
  let newAllMessageThreads;

  switch (action.type) {
    case USER_SENT_FIRST_MESSAGE:
      console.log('USER_SENT_FIRST_MESSAGE dispatched');
      newAllMessageThreads = helpers.addMessageThread(state.allMessageThreads, action.data);
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
      newAllMessageThreads = helpers.sortAllMessageThreads(replacedAllMessageThreads);
      return {
        ...state,
        currentMessageThread: action.data.messages,
        allMessageThreads: newAllMessageThreads
      };
      break;
    case GET_USER_MESSAGES:
      console.log('GET_USER_MESSAGES dispatched');
      newAllMessageThreads = helpers.sortAllMessageThreads(action.data);
      const lastThread = newAllMessageThreads[0];
      newCurrentMessageThread = lastThread.messages;
      const newCurrentMessageThreadName = lastThread.threadName;
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
        allMessageThreads: newAllMessageThreads
      };
      break;
    case USER_CHANGED_CURRENT_THREAD:
      console.log('USER_CHANGED_CURRENT_THREAD dispatched');
      const newCurrentThread = state.allMessageThreads.filter(thread => {
        return thread.threadName === action.data;
      }).pop();
      newCurrentMessageThread = newCurrentThread.messages;
      if (action.role.Donor) {
        newCurrentMessageThreadUserName = newCurrentThread.nameUserOne;
      } else {
        newCurrentMessageThreadUserName = newCurrentThread.nameUserTwo;
      }      
      return {
        ...state,
        currentMessageThreadName: action.data,
        currentMessageThread: newCurrentMessageThread,
        currentMessageThreadUserName: newCurrentMessageThreadUserName
      };
      break;
    case NEW_MESSAGE_RECEIVED:
      console.log('NEW_MESSAGE_RECEIVED dispatched');
      newCurrentMessageThread = [...state.currentMessageThread];
      newCurrentMessageThread.push(action.data.message);
      return {
        ...state,
        currentMessageThread: newCurrentMessageThread,
      };
      break;
    default:
      return state;
  }
}



