import React, { Component } from 'react';
import Button from '../../components/button/button';
import './_navbar.sass';

export default class NavBar extends Component {
  render() {
    const { auth } = this.props;
    return (
      <header className="navbar-container">
        <Button value="Sign Out"></Button>
      </header>
    );
  }
}
