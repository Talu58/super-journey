import axios from 'axios';

export function sendFirstMessageRequest(userData) {
    return axios.post('/message/first', userData);
};