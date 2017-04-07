import { FIND_USER_MATCHES } from './searchActionTypes';
import * as search from '../../utils-api/search/search-rest-api';

export function getUserMatches(user) {
  return dispatch => {
    return search.getUserMatchesRequest(user)
      .then(matches => {
        console.log(matches);
        dispatch({
          type: FIND_USER_MATCHES,
          data: matches
        });
      }).catch( err => {
        console.log('getUserMatches err', err);
      })
  };
};


