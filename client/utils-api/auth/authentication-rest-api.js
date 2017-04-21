import axios from 'axios';

export function signUpRequest(userData) {
    return axios.post('/user/signup', userData);
};

export function completedSignUpRequest(userData) {
    return axios.post('/user/signup/completed', userData);
};

export function uploadImage(file) {
    return axios.post('/user/organization/image/upload', file);
};

export function loginRequest(userData) {
    return axios.post('/user/login', userData);
};

export function getUserInfo(userEmail) {
    return axios.get('/user/information/' + userEmail);
};

export function updateOrganizationInformation(userInfo) {
    return axios.post('/user/organization/update', userInfo);
};

