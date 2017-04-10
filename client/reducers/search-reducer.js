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
  matches: [],
  searchResult: [],
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
      let tempMatches = state.matches.concat(action.data);
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
        matches: finalMatches
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
        console.log('FIND_INDUSTRY_SEARCH dispatched', action.data);
      let finalSearchResult = [];
      let isSearching = true;
      if (state.searchResult.length === 0) {
        finalSearchResult = state.searchResult.concat(action.data);
      } else {
        let tempSearchResult = state.searchResult.concat(action.data);
        tempSearchResult.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
        for (let i = 0; i < tempSearchResult.length; i++) {
          if (finalSearchResult.length === 0 || finalSearchResult[finalSearchResult.length-1].created_at !== tempSearchResult[i].created_at) {
            finalSearchResult.push(tempSearchResult[i]);
          } else {
            const newIndustryName = Object.keys(tempSearchResult[i].industryNames)[0];
            finalSearchResult[finalSearchResult.length-1].industryNames[newIndustryName] = true;
          }
        }
      }
        return {
          ...state,
          searchResult: finalSearchResult,
          isSearching
        }
    case REMOVE_INDUSTRY_SEARCH:
      console.log('REMOVE_INDUSTRY_SEARCH dispatched');
      let newSearchResults = state.searchResult.slice();
      let finalSearchResults = [];
      let isDoneSearching = false;
      for (let i = 0; i < newSearchResults.length; i++) {
        if (newSearchResults[i].industryNames[action.data]) {
          delete newSearchResults[i].industryNames[action.data];
        }
        if  (Object.keys(newSearchResults[i].industryNames).length !== 0) {
            finalSearchResults.push(newSearchResults[i]);
        }
      }
      if (finalSearchResults.length === 0) {
        isDoneSearching = true;
      }
      return {
        ...state,
        searchResult: finalSearchResults,
        isSearching: !isDoneSearching
      };
    case SEARCH_REQUEST: 
      console.log('SEARCH_REQUEST dispatched', action.data);
    return {
      ...state
    }
    default: 
      return state;

  }
}