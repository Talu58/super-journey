import { FIND_USER_MATCHES } from '../actions/search/searchActionTypes';

const initialState = {
  matches: [
    {title: 'project 1', description: 'description for project 1'},
    {title: 'project 2', description: 'description for project 2'},
    {title: 'project 3', description: 'description for project 3'},
    {title: 'project 4', description: 'description for project 4'},
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FIND_USER_MATCHES:
      console.log('FIND_USER_MATCHES dispatched');
      console.log('FIND_USER_MATCHES data', action.data);
      return {
        ...state
      };
      break;
    default: 
      return state;

  }
}