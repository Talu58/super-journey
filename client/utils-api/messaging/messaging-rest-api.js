import axios from 'axios';

export function sendFirstMessageRequest(messageInformation) {
    return axios.post('/message/first', messageInformation);
};

export function sendNewMessageRequest(messageInformation) {
    return axios.post('/message/new', messageInformation);
}


