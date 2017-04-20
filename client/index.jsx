import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import Router from './views/app-router-connector';
import setAuthorizationToken from './utils-api/auth/authentication-set-token';
import { authenticateUser } from './actions/auth/authActions';
import jwt from 'jsonwebtoken';
import socket from './utils-socket/socket-connection.js';

const store = configureStore({});

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(authenticateUser(jwt.decode(localStorage.jwtToken)));
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
