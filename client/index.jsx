import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import Router from './views/app-router-connector';
import firebase from 'firebase';
import config from '../firebase_config';

const store = configureStore({});

class App extends Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(config);
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
