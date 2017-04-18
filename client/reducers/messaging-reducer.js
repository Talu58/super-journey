import {
  USER_SENT_FIRST_MESSAGE
} from '../actions/messaging/messagingActionTypes';

const initialState = {
  currentMessageThreadName: '',
  currentMessageThread: [],
  allMessageThreads: []
};

export default (state = initialState, action ) => {
  switch (action.type) {
    case USER_SENT_FIRST_MESSAGE:
      console.log('USER_SENT_FIRST_MESSAGE dispatched');
      // newAllMessageThreads = state.allMessageThreads;
      // newAllMessageThreads
      return {
        ...state,
        currentMessageThreadName: action.data.threadName,
        currentMessageThread: action.data.messages,
        // allMessageThreads[action.data.threadName]: action.data.messages
      };
      break;
    default:
      return state;
  }
}