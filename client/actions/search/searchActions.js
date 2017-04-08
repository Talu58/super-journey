import { 
  FIND_USER_MATCHES,
  FIND_INDUSTRY_MATCHES
} from './searchActionTypes';
import * as search from '../../utils-api/search/search-rest-api';
// import _map from 'lodash/map';


export function getUserMatches(user) {
  return dispatch => {
    for (let industryName in user.industry)
      if (user.industry[industryName] && industryName !== '_id') {
        dispatch(getIndustryMatches(industryName))
      }
  };
};

export function getIndustryMatches(industryName) {
  return dispatch => {
    return search.getIndustryMatchesRequest(industryName)
      .then(({ data: { matches } }) => {
        const matchingProject = matches.map(match => {
          const { project: { title, description }, created_at } = match;
          return {
            title ,
            description,
            created_at
          };
        });
        dispatch({
          type: FIND_INDUSTRY_MATCHES,
          data: matchingProject
        });
      }).catch( err => {
        console.log('getIndustryMatches err', err);
      })
  };
};
