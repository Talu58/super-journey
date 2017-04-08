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
      console.log('newMatches', newMatches);
      return {
        ...state,
        matches: newMatches
      };
      break;
    default: 
      return state;

  }
}