import axios from 'axios';

export function signUpRequest(userData) {
  //send request to DB
    //if email exist & pwd correct
    //else if email exist and pwd incorrect
    //else if email doesn't exist    
    return axios.post('/user/signup', userData);
}

export function completedSignUpRequest(userData) {
    return axios.post('/user/signup/completed', userData);
}