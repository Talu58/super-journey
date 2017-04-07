import axios from 'axios';

export function getUserMatchesRequest(user) {
  const promises = [];
  for (let key in user.industry) {
    if (user.industry[key]) {
      promises.push(key);
    }
  }
  console.log(promises);
  // return Promise.all([...promises])
  return axios.get('/matches/' + user);
}