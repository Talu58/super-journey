import { 
  FIND_USER_MATCHES,
  FIND_INDUSTRY_MATCHES
} from './searchActionTypes';
import * as search from '../../utils-api/search/search-rest-api';

export function getUserMatches(user) {
  return dispatch => {
    for (let industryName in user.industry)
      if (user.industry[industryName] && industryName !== '_id') {
        console.log('getUserMatches industry true', industryName);
        dispatch(getIndustryMatches(industryName))
      }
  };
};

export function getIndustryMatches(industryName) {
  console.log('getIndustryMatches invoked');
  return dispatch => {
    return search.getIndustryMatchesRequest(industryName)
      .then(matches => {
        console.log('matches', matches);
        dispatch({
          type: FIND_INDUSTRY_MATCHES,
          data: matches
        });
      }).catch( err => {
        console.log('getIndustryMatches err', err);
      })
  };
};
