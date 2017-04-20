import React, { Component, PropTypes } from 'react';
import Button from '../../components/button/button';
import LoginForm from './login-form/login-form';
import { NavLink } from 'react-router-dom';
import './_navbar.sass';

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    const { logout, allMessageThreads } = this.props;
    logout(allMessageThreads);
  }

  render() {
    const { isAuth, completedProfile } = this.props;
    return (
      <header className="navbar-container">
        <div className="logo-container"> 
          <NavLink to="/">
            <img src="http://localhost:3000/assets/logo.png" className="nav-logo"/>
          </NavLink>
        </div>
        <div className="navbar-actions-container">
          {isAuth && completedProfile ? 
            <div className="navbar-actions-nav-container" >
              <NavLink
                to="/home"
                className="nav-link"
                activeClassName="nav-link-active"
              >HOME</NavLink>
              <NavLink
                to="/messaging"
                className="nav-link"
                activeClassName="nav-link-active"
              >MESSAGING</NavLink>
              <NavLink
                to="/profile"
                className="nav-link"
                activeClassName="nav-link-active"
              >PROFILE</NavLink>
            </div>
            : null
          }
          {isAuth ? 
            <div className="nav-link nav-link-logout" >
              <Button
                value="LOGOUT"
                clickHandler={this.logout}
                containerStyleClassName="nav-button-container"
                styleClassName="nav-button"
              />
            </div>
            : <LoginForm/>
          }
        </div>
      </header>
    );
  }
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  completedProfile: PropTypes.bool.isRequired,
  allMessageThreads: PropTypes.array
};
