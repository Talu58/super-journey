import { 
  FIND_USER_MATCHES,
  FIND_INDUSTRY_MATCHES,
  CHECKBOX_CLICKED,
  FIND_INDUSTRY_SEARCH,
  REMOVE_INDUSTRY_SEARCH,
  SEARCH_REQUEST
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
  allMatchResults: [],
  allFilterResults: [],
  allDisplayedResults: [],
  isSearching: false
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
      }
      case FIND_INDUSTRY_SEARCH:
        console.log('FIND_INDUSTRY_SEARCH dispatched');
      let finalFilterResult = [];
      let isSearching = true;
      if (state.allFilterResults.length === 0) {
        finalFilterResult = action.data;
      } else {
        let tempFilterResult = state.allFilterResults.concat(action.data);
        tempFilterResult.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
        for (let i = 0; i < tempFilterResult.length; i++) {
          if (finalFilterResult.length === 0 || finalFilterResult[finalFilterResult.length-1].created_at !== tempFilterResult[i].created_at) {
            finalFilterResult.push(tempFilterResult[i]);
          } else {
            const newIndustryName = Object.keys(tempFilterResult[i].industryNames)[0];
            finalFilterResult[finalFilterResult.length-1].industryNames[newIndustryName] = true;
          }
        }
      }
        return {
          ...state,
          allFilterResults: finalFilterResult,
          allDisplayedResults: finalFilterResult,
          isSearching
        }
    case REMOVE_INDUSTRY_SEARCH:
      console.log('REMOVE_INDUSTRY_SEARCH dispatched');
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
        isSearching: !isDoneSearching
      };
    case SEARCH_REQUEST: 
      console.log('SEARCH_REQUEST dispatched');
      let newSearchBarResults = []; 
      let searchPull;
      let searchWord = action.data.toLowerCase();
      if (state.allFilterResults.length === 0) {
        searchPull = state.allMatchResults;
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
      isSearching: true
    }
    default: 
      return state;

  }
}