import {
  USER_SENT_FIRST_MESSAGE
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