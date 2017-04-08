import { 
  FIND_USER_MATCHES,
  FIND_INDUSTRY_MATCHES
} from '../actions/search/searchActionTypes';

const initialState = {
  matches: []
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
      let newMatches = state.matches.concat(action.data);
      newMatches.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
      let finalMatches = [];
      for (let i = 0; i < newMatches.length; i++) {
        if (finalMatches.length === 0) {
          finalMatches.push(newMatches[i]);
        } else if (finalMatches[finalMatches.length-1].created_at !== newMatches[i].created_at) {
          finalMatches.push(newMatches[i]);
        }
      }
      return {
        ...state,
        matches: finalMatches
      };
      break;
    default: 
      return state;

  }
}