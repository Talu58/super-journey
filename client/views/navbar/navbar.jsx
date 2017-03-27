import React, { Component } from 'react';
import Button from '../../components/button/button';
import './_navbar.sass';

export default class NavBar extends Component {
  render() {
    const { isAuth } = this.props;
    return (
      <header className="navbar-container">
        <div className="navbar-actions-container">
          {isAuth ? <Button value="Sign Out"></Button> : null}
        </div>
      </header>
    );
  }
}
