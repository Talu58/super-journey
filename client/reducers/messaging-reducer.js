import {
  USER_SENT_FIRST_MESSAGE,
  USER_SENT_MESSAGE,
  GET_USER_MESSAGES,
  USER_CHANGED_CURRENT_THREAD,
  NEW_MESSAGE_RECEIVED_ON_CURRENT_THREAD,
  NEW_MESSAGE_RECEIVED_ON_OTHER_THREAD
} from '../actions/messaging/messagingActionTypes';
import * as helpers from '.././utils-helpers/messaging-helpers';

const initialState = {
  currentMessageThreadUserName: '',
  currentMessageThreadName: '',
  currentMessageThread: [],
  allMessageThreads: [],
  messagesNotification: {}
};

export default (state = initialState, action ) => {
  let newCurrentMessageThreadUserName;
  let newCurrentMessageThread;
  let newAllMessageThreads;
  let newMessagesNotification;

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
      newMessagesNotification = helpers.setNotificationList(action.data);
      let lastThread, newCurrentMessageThreadName;

      if (newAllMessageThreads.length !== 0) {
        lastThread = newAllMessageThreads[0];
        newCurrentMessageThread = lastThread.messages;
        newCurrentMessageThreadName = lastThread.threadName;
        if (action.role.Donor) {
          newCurrentMessageThreadUserName = lastThread.nameUserOne;
        } else {
          newCurrentMessageThreadUserName = lastThread.nameUserTwo;
        }
      } else {
        newCurrentMessageThread = state.currentMessageThread;
        newCurrentMessageThreadName = state.currentMessageThreadName;
        newCurrentMessageThreadUserName = state.currentMessageThreadUserName;
      }
      return {
        ...state,
        currentMessageThreadUserName: newCurrentMessageThreadUserName,
        currentMessageThreadName: newCurrentMessageThreadName,
        currentMessageThread: newCurrentMessageThread,
        allMessageThreads: newAllMessageThreads,
        messagesNotification: newMessagesNotification
      };
      break;
    case USER_CHANGED_CURRENT_THREAD:
      console.log('USER_CHANGED_CURRENT_THREAD dispatched');
      const newCurrentThread = state.allMessageThreads.filter(thread => {
        return thread.threadName === action.data;
      }).pop();
      newMessagesNotification = {
        ...state.messagesNotification
      };
      newMessagesNotification[action.data] = 0;
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
        currentMessageThreadUserName: newCurrentMessageThreadUserName,
        messagesNotification: newMessagesNotification
      };
      break;
    case NEW_MESSAGE_RECEIVED_ON_CURRENT_THREAD:
      console.log('NEW_MESSAGE_RECEIVED_ON_CURRENT_THREAD dispatched');
      newCurrentMessageThread = [...state.currentMessageThread];
      newCurrentMessageThread.push(action.data.message);
      newAllMessageThreads = helpers.addReceivedMessageToAllMessageThreads(state.allMessageThreads, action.data.message);
      return {
        ...state,
        currentMessageThread: newCurrentMessageThread,
        allMessageThreads: newAllMessageThreads
      };
      break;
    case NEW_MESSAGE_RECEIVED_ON_OTHER_THREAD:
      console.log('NEW_MESSAGE_RECEIVED_ON_OTHER_THREAD dispatched');
      newAllMessageThreads = helpers.addReceivedMessageToAllMessageThreads(state.allMessageThreads, action.data.message);
      newMessagesNotification = {
        ...state.messagesNotification
      };
      newMessagesNotification[action.data.message.threadName]++;
      return {
        ...state,
        allMessageThreads: newAllMessageThreads,
        messagesNotification: newMessagesNotification
      };
      break;
    default:
      return state;
  }
}



