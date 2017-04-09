import { 
  FIND_USER_MATCHES,
  FIND_INDUSTRY_MATCHES,
  CHECKBOX_CLICKED
} from './searchActionTypes';
import * as search from '../../utils-api/search/search-rest-api';


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

export function searchCheckboxClicked(checkboxID, currentCheckboxesStatus) {
  return dispatch => {
    for (let i = 0; i < currentCheckboxesStatus.length; i++) {
      if (currentCheckboxesStatus[i].value === checkboxID) {
        currentCheckboxesStatus[i].checked = !currentCheckboxesStatus[i].checked;
      }
    }
    dispatch({
      type: CHECKBOX_CLICKED,
      data: currentCheckboxesStatus
    });
    // for (let i = 0; i < currentCheckboxesStatus.length; i++) {
    //   if (user.industry[industryName]) {
    //       dispatch(getIndustryMatches(industryName))
    //   }
    // }
  }
}