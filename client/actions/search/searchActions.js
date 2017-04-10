import { 
  FIND_USER_MATCHES,
  FIND_INDUSTRY_MATCHES,
  CHECKBOX_CLICKED,
  FIND_INDUSTRY_SEARCH,
  REMOVE_INDUSTRY_SEARCH,
  SEARCH_REQUEST,
  REINITIALIZE_SEARCH_STATE,
  GET_ALL_PROJECTS
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
  return dispatch => {
    return search.getIndustryMatchesRequest(industryName)
      .then(({ data: { matches } }) => {
        const matchingProjects = matches.map(match => {
          const { project: { title, description }, created_at } = match;
          let newIndustryName = {};
          newIndustryName[industryName] = true;
          return {
            title ,
            description,
            created_at,
            industryNames: newIndustryName
          };
        });
        dispatch({
          type: FIND_INDUSTRY_SEARCH,
          data: matchingProjects
        });
      }).catch( err => {
        console.log('getIndustryMatches err', err);
      });
  };
};

export function removeIndustrySearch(industryName) {
  return {
    type: REMOVE_INDUSTRY_SEARCH,
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

export function fetchAllProjects() {
  return dispatch => {
    return search.getAllProjects()
      .then(projects => {
        console.log(projects);
        dispatch({
          type: GET_ALL_PROJECTS,
          data: projects.data
        })
      })
  };
};
