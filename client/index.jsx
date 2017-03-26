import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';


const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>Hello World</Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));



