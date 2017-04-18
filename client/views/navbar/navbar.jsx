import React, { Component, PropTypes } from 'react';
import Button from '../../components/button/button';
import LoginForm from './login-form/login-form';
import { Link } from 'react-router-dom';
import './_navbar.sass';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: {
        home: true,
        messaging: false,
        profile: false
      }
    }
    this.logout = this.logout.bind(this);
    this.navButtonClicked = this.navButtonClicked.bind(this);
  }

  logout() {
    const { logout } = this.props;
    logout();
  }

  navButtonClicked(e) {
    let newNavState = {};
    for (let key in this.state.nav) {
      if (key === e.target.name) {
        newNavState[key] = true
      } else {
        newNavState[key] = false
      }
    }
    this.setState({
      nav: newNavState
    });
  }

  render() {
    const { isAuth, completedProfile } = this.props;
    return (
      <header className="navbar-container">
        <div className="logo-container"> 
          <Link to="/">
            <img src="http://localhost:3000/assets/logo.png" className="nav-logo"/>
          </Link>
        </div>
        <div className="navbar-actions-container">
          {isAuth && completedProfile ? 
            <div className="navbar-actions-nav-container" >
              <Link to="/home" className="nav-link" >
                <Button
                  name="home"
                  value="HOME"
                  containerStyleClassName="nav-button-container"
                  styleClassName="nav-button"
                  active={this.state.nav.home}
                  clickHandler={this.navButtonClicked}
                />
              </Link>
              <Link to="/messaging" className="nav-link" >
                <Button
                  name="messaging"
                  value="MESSAGING"
                  containerStyleClassName="nav-button-container"
                  styleClassName="nav-button"
                  active={this.state.nav.messaging}
                  clickHandler={this.navButtonClicked}
                />
              </Link>
              <Link to="/profile" className="nav-link" >
                <Button
                  name="profile"
                  value="PROFILE"
                  containerStyleClassName="nav-button-container"
                  styleClassName="nav-button"
                  active={this.state.nav.profile}
                  clickHandler={this.navButtonClicked}
                />
              </Link>
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
  completedProfile: PropTypes.bool.isRequired
};
