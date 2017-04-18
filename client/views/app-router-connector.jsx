import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AppLayout from './app-layout';


export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={AppLayout}></Route>
      </BrowserRouter>
    );
  }
} 


