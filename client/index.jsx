import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configure-store';
import routes from './views/app-router-connector';


const store = configureStore({});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
