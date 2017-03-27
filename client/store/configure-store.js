import { createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers';

function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        reduxThunk
      ),
      window.devToolsExtension? window.devToolsExtension() : f => f,
    ),
  );

  return store;
}

export default configureStore;
