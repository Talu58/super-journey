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
} from '../actions/search/searchActionTypes';
import * as helpers from '.././utils-helpers/search-helpers';

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
  currentPull: [],
  allProjectsResults: [],
  allMatchResults: [],
  allFilterResults: [],
  allDisplayedResults: [],
  isFiltering: false,
  filters: []
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
      let tempMatches = state.allMatchResults.concat(action.data);
      let finalMatches = helpers.removeDuplicates(tempMatches);
      return {
        ...state,
        allMatchResults: finalMatches,
        allDisplayedResults: finalMatches,
        currentPull: finalMatches
      };
      break;
    case CHECKBOX_CLICKED:
      console.log('CHECKBOX_CLICKED dispatched');
      const newIndustryList = action.data.slice();
      return {
        ...state,
        industriesList: newIndustryList,
      };
      break;
    case ADD_INDUSTRY_FILTER:
      console.log('ADD_INDUSTRY_FILTER dispatched');
      let { isFiltering } = state;
      let newResultPull;
      let finalDisplayedResults = [];
      let newFilters = state.filters.concat(action.data);
      if (state.userMatchesDisplayed) {
        newResultPull = state.allMatchResults;
      } else {
        newResultPull = state.allProjectsResults;
      }
      if (isFiltering) {
        let tempDisplayedResults = state.allDisplayedResults.concat(newResultPull.filter(project => {
          return project.industryNames[action.data];
        }));
        finalDisplayedResults = helpers.removeDuplicates(tempDisplayedResults);
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
        isFiltering,
        filters: newFilters
      };
      break;
    case REMOVE_INDUSTRY_FILTER:
      console.log('REMOVE_INDUSTRY_FILTER dispatched');
      const filterIndex = state.filters.indexOf(action.data);
      let newFilter = state.industriesList.filter(industry => industry.checked);
      let newFiltersResults = [];
      let newPull = state.currentPull;
      let isDoneFiltering = false;

      if (newFilter.length === 0) {
        newFiltersResults = newPull;
        isDoneFiltering = true;
      } else {
        let tempFiltersResults = [];
        state.filters.forEach(filterName => {
          tempFiltersResults = tempFiltersResults.concat(newPull.filter(project => {
            return project.industryNames[filterName];
          }));
        });
        newFiltersResult = helpers.removeDuplicates(tempFiltersResults);
      }
      return {
        ...state,
        allFilterResults: newFiltersResults,
        allDisplayedResults: newFiltersResults,
        isFiltering: !isDoneFiltering
      };
      break;
    case SEARCH_REQUEST: 
      console.log('SEARCH_REQUEST dispatched');
      let searchPull = state.isFiltering ? state.allFilterResults : state.currentPull;
      let newSearchBarResults = helpers.searchProjects(searchPull, action.data); 
      return {
        ...state,
        allDisplayedResults: newSearchBarResults,
        isFiltering: true
      };
      break;
    case REINITIALIZE_SEARCH_STATE:
      console.log('REINITIALIZE_SEARCH_STATE dispatched');
      let reinitializedIndustryList = initialState.industriesList;
      reinitializedIndustryList.forEach(industry => industry.checked = false);
      return {
        ...initialState,
        newIndustryList: reinitializedIndustryList
      };
      break;
    case GET_ALL_PROJECTS:
      console.log('GET_ALL_PROJECTS dispatched');
      return {
        ...state,
        allDisplayedResults: action.data,
        allProjectsResults: action.data,
        userMatchesDisplayed: false
      };
      break;
      case FETCH_USER_MATCHES:
      console.log('FETCH_USER_MATCHES dispatched');
      return {
        ...state,
        allDisplayedResults: state.allMatchResults,
        currentPull: state.allMatchResults,
        userMatchesDisplayed: true
      };
      break;
    case FETCH_ALL_PROJECTS:
      console.log('FETCH_ALL_PROJECTS dispatched');
      return {
        ...state,
        allDisplayedResults: state.allProjectsResults,
        currentPull: state.allProjectsResults,
        userMatchesDisplayed: false
      };
      break;
    default: 
      return state;
  };
};

