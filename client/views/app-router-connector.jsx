import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AppLayout from './app-layout';
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={AppLayout}></Route>
      </BrowserRouter>
    );
  }
} 


