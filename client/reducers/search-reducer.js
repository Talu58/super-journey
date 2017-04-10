import { 
  FIND_USER_MATCHES,
  FIND_INDUSTRY_MATCHES,
  CHECKBOX_CLICKED,
  ADD_INDUSTRY_FILTER,
  REMOVE_INDUSTRY_FILTER,
  SEARCH_REQUEST,
  REINITIALIZE_SEARCH_STATE,
  GET_ALL_PROJECTS,
  FETCH_USER_MATCHES
} from '../actions/search/searchActionTypes';

const initialState = {
  industriesList: [
    {value: 'Healthcare',
      checked: false},
    {value: 'Tech',
      checked: false},
    {value: 'Climat',
      checked: false},
    {value: 'Inclusion',
      checked: false},
    {value: 'Global Change',
      checked: false}
  ],
  userMatchesDisplayed: true,
  allProjectsResults: [],
  allMatchResults: [],
  allFilterResults: [],
  allDisplayedResults: [],
  isFiltering: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FIND_USER_MATCHES:
      console.log('FIND_USER_MATCHES dispatched');
      return {
        ...state
      };
      break;
    case FIND_INDUSTRY_MATCHES:
      console.log('FIND_INDUSTRY_MATCHES dispatched');
      let finalMatches = [];
      let tempMatches = state.allMatchResults.concat(action.data);
      tempMatches.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
      for (let i = 0; i < tempMatches.length; i++) {
        if (finalMatches.length === 0) {
          finalMatches.push(tempMatches[i]);
        } else if (finalMatches[finalMatches.length-1].created_at !== tempMatches[i].created_at) {
          finalMatches.push(tempMatches[i]);
        }
      }
      return {
        ...state,
        allMatchResults: finalMatches,
        allDisplayedResults: finalMatches
      };
      break;
    case CHECKBOX_CLICKED:
      console.log('CHECKBOX_CLICKED dispatched');
      const newIndustryList = action.data.slice();
      return {
        ...state,
        industriesList: newIndustryList,
      };
    case ADD_INDUSTRY_FILTER:
      console.log('ADD_INDUSTRY_FILTER dispatched');
      let { isFiltering } = state;
      let newResultPull;
      let finalDisplayedResults = [];
      if (state.userMatchesDisplayed) {
        newResultPull = state.allMatchResults;
      } else {
        newResultPull = state.allProjectsResults;
      }
      if (isFiltering) {
        let tempDisplayedResults = state.allDisplayedResults.concat(newResultPull.filter(project => {
          return project.industryNames[action.data];
        }));
        tempDisplayedResults.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
        for (let i = 0; i < tempDisplayedResults.length; i++) {
          if (finalDisplayedResults.length === 0) {
            finalDisplayedResults.push(tempDisplayedResults[i]);
          } else if (finalDisplayedResults[finalDisplayedResults.length-1].created_at !== tempDisplayedResults[i].created_at) {
            finalDisplayedResults.push(tempDisplayedResults[i]);
          }
        }
      } else {
        isFiltering = true;
        finalDisplayedResults = newResultPull.filter(project => {
          return project.industryNames[action.data];
        });
      }
      return {
        ...state,
        allFilterResults: finalDisplayedResults,
        allDisplayedResults: finalDisplayedResults,
        isFiltering
      };
    case REMOVE_INDUSTRY_FILTER:
      console.log('REMOVE_INDUSTRY_FILTER dispatched');
      let newFilterResults = state.allFilterResults.slice();
      let finalFilterResults = [];
      let isDoneSearching = false;
      let allDisplayedResults;
      for (let i = 0; i < newFilterResults.length; i++) {
        if (newFilterResults[i].industryNames[action.data]) {
          delete newFilterResults[i].industryNames[action.data];
        }
        if  (Object.keys(newFilterResults[i].industryNames).length !== 0) {
            finalFilterResults.push(newFilterResults[i]);
        }
      }
      if (finalFilterResults.length === 0) {
        isDoneSearching = true;
        allDisplayedResults = state.allMatchResults;
      } else {
        allDisplayedResults = finalFilterResults;
      }
      return {
        ...state,
        allFilterResults: finalFilterResults,
        allDisplayedResults,
        isFiltering: !isDoneSearching
      };
    case SEARCH_REQUEST: 
      console.log('SEARCH_REQUEST dispatched');
      let newSearchBarResults = []; 
      let searchPull;
      let searchWord = action.data.toLowerCase();
      if (state.allFilterResults.length === 0) {
        if (state.userMatchesDisplayed) {
          searchPull = state.allMatchResults;
        } else {
          searchPull = state.allProjectsResults;
        }
      } else {
        searchPull = state.allFilterResults;
      }
      for (let i = 0; i < searchPull.length; i++) {
        if (searchPull[i].title.toLowerCase().indexOf(searchWord) !== -1 || searchPull[i].description.toLowerCase().indexOf(searchWord) !== -1) {
          newSearchBarResults.push(searchPull[i]);
        }
      }
    return {
      ...state,
      allDisplayedResults: newSearchBarResults,
      isFiltering: true
    };
    case REINITIALIZE_SEARCH_STATE:
      console.log('REINITIALIZE_SEARCH_STATE dispatched');
      let reinitializedIndustryList = initialState.industriesList;
      reinitializedIndustryList.forEach(industry => industry.checked = false);
      return {
        ...initialState,
        newIndustryList: reinitializedIndustryList
      };
    case GET_ALL_PROJECTS:
      console.log('GET_ALL_PROJECTS dispatched');
      return {
        ...state,
        allDisplayedResults: action.data,
        allProjectsResults: action.data,
        userMatchesDisplayed: false
      };
      case FETCH_USER_MATCHES:
      console.log('FETCH_USER_MATCHES dispatched');
      return {
        ...state,
        allDisplayedResults: state.allMatchResults,
        userMatchesDisplayed: true
      }
    default: 
      return state;

  }
}