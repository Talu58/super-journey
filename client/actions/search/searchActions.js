import { 
  FIND_USER_MATCHES,
  FIND_INDUSTRY_MATCHES,
  CHECKBOX_CLICKED,
  ADD_INDUSTRY_FILTER,
  REMOVE_INDUSTRY_FILTER,
  SEARCH_REQUEST,
  REINITIALIZE_SEARCH_STATE,
  GET_ALL_PROJECTS,
  FETCH_USER_MATCHES,
  FETCH_ALL_PROJECTS
} from './searchActionTypes';
import * as search from '../../utils-api/search/search-rest-api';


export function getUserMatches(user) {
  return dispatch => {
    for (let industryName in user.industry)
      if (user.industry[industryName] && industryName !== '_id') {
        dispatch(getIndustryMatches(industryName));
      }
  };
};

export function getIndustryMatches(industryName) {
  return dispatch => {
    return search.getIndustryMatchesRequest(industryName)
      .then(({ data: { matches } }) => {
        const matchingOrganization = matches.map(match => {
          const { organization: { title, description }, created_at, industry, email, firstname } = match;
          let newIndustryName = {};
          for (let key in industry) {
            if (industry[key] === true) {
              newIndustryName[key] = true;
            }
          }
          return {
            title ,
            description,
            created_at,
            industryNames: newIndustryName,
            email,
            firstname
          };
        });
        dispatch({
          type: FIND_INDUSTRY_MATCHES,
          data: matchingOrganization
        });
      }).catch( err => {
        console.log('getIndustryMatches err', err);
      });
  };
};

export function searchCheckboxClicked(checkboxID, currentCheckboxesStatus) {
  return dispatch => {
    let addNewSearch = false;
    for (let i = 0; i < currentCheckboxesStatus.length; i++) {
      if (currentCheckboxesStatus[i].value === checkboxID) {
        addNewSearch = !currentCheckboxesStatus[i].checked;
        currentCheckboxesStatus[i].checked = !currentCheckboxesStatus[i].checked;
      }
    }
    dispatch({
      type: CHECKBOX_CLICKED,
      data: currentCheckboxesStatus
    });
    if (addNewSearch) {
      dispatch(getIndustrySearch(checkboxID));
    } else {
      dispatch(removeIndustrySearch(checkboxID));
    }
  };
};

export function getIndustrySearch(industryName) {
      return {
          type: ADD_INDUSTRY_FILTER,
          data: industryName
        }
};

export function removeIndustrySearch(industryName) {
  return {
    type: REMOVE_INDUSTRY_FILTER,
    data: industryName
  };
};


export function searchRequest(searchWord) {
  return {
    type: SEARCH_REQUEST,
    data: searchWord
  };
};

export function reinitializeSearchState() {
  return {
    type: REINITIALIZE_SEARCH_STATE
  };
};

export function fetchAllOrganizations(allOrganizationsList) {
  return dispatch => {
    if (allOrganizationsList.length === 0) {
      return search.getAllOrganizations()
        .then(({ data: { organizations } }) => {
          const allOrganizations = organizations.map(organization => {
            const { organization: { title, description }, created_at, industry } = organization;
            let newIndustryName = {};
            for (let key in industry) {
              if (industry[key] === true) {
                newIndustryName[key] = true;
              }
            }
            return {
              title ,
              description,
              created_at,
              industryNames: newIndustryName
            };
          });
          allOrganizations.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
          dispatch({
            type: GET_ALL_PROJECTS,
            data: allOrganizations
          });
          dispatch({
            type: FETCH_ALL_PROJECTS,
          });
        });
    }
    dispatch({
      type: FETCH_ALL_PROJECTS,
    });

  };
};

export function fetchUserMatches() {
  return {
    type: FETCH_USER_MATCHES
  }
}