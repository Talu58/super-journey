import { combineReducers } from 'redux';
import  auth from './auth-reducer';
import  search from './search-reducer';
import messaging from './messaging-reducer';

const rootReducer = combineReducers({
  auth,
  search,
  messaging
});

export default rootReducer;

