import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';
import { reduxReactRouter, routerStateReducer } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import * as reducers from './reducers';

const reducer = combineReducers({
  router: routerStateReducer,
  ...reducers,
});


const composeStoreWithMiddleware = compose(
  applyMiddleware(
    reduxThunk
  ),
  reduxReactRouter({createHistory})
)(createStore);


export default function configureStore(initialState) {
  return composeStoreWithMiddleware(reducer, initialState);
}



