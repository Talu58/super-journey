import React, { Component } from 'react';
import Button from '../../components/button/button';
import { Link } from 'react-router-dom';
import './_navbar.sass';

export default class NavBar extends Component {
  render() {
    const { isAuth } = this.props;
    return (
      <header className="navbar-container">
        <div className="navbar-actions-container">
          {isAuth ? 
            <Button value="Sign Out"></Button> 
            : <Link to="/login"><Button value="Log-in"></Button></Link>
          }
        </div>
      </header>
    );
  }
}
