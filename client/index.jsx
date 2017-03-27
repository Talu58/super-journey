import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store/configure-store';
import routes from './views/app-router-connector';


const store = configureStore({});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Router routes={routes} />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
