import {
  USER_SENT_FIRST_MESSAGE,
  USER_SENT_MESSAGE,
  GET_USER_MESSAGES,
  USER_CHANGED_CURRENT_THREAD
} from './messagingActionTypes';
import * as messaging from '../../utils-api/messaging/messaging-rest-api';


export function firstMessageSent(messageInformation) {
  return dispatch => {
    messaging.sendFirstMessageRequest(messageInformation)
    .then(messageThread => {
      console.log('firstMessageSent messageThread', messageThread.data);
      dispatch({
        type: USER_SENT_FIRST_MESSAGE,
        data: messageThread.data
      });
    });
  };
};

export function newMessageSent(messageInformation) {
  return dispatch => {
    messaging.sendNewMessageRequest(messageInformation)
    .then(messageThread => {
      dispatch({
        type: USER_SENT_MESSAGE,
        data: messageThread.data,
      });
    });
  };
};

export function getUserMessages(userEmail, role) {
  return dispatch => {
    messaging.getAllUserMessagesRequest(userEmail)
    .then(allMessageThreads => {
      dispatch({
        type: GET_USER_MESSAGES,
        data: allMessageThreads.data,
        role: role
      });
    });
  };
};

export function userChangedCurrentThread(threadName) {
  return {
    type: USER_CHANGED_CURRENT_THREAD,
    data: threadName
  };
};
