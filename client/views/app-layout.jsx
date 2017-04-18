import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import NavBar from './navbar/navbar';
import LandingPage from './landing-page/landing-page';
import SignUpSteps from './signup-steps/signup-steps';
import Home from './home/home';
import Messaging from './messaging/messaging';
import Profile from './profile/profile';
import PrivateRoute from '../utils-router/private-route';
import { logout } from '../actions/auth/authActions';
import { bindActionCreators } from 'redux';

export class AppLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuth, completedProfile, dispatch, logout } = this.props;
    return (
      <div className="app-layout-container">
        <NavBar isAuth={isAuth} completedProfile={completedProfile} logout={logout}/>
        <main>
          <Route exact path='/' component={LandingPage} />
          <PrivateRoute path="/signup" component={SignUpSteps} isAuth={isAuth} />
          <PrivateRoute path="/home" component={Home} isAuth={isAuth} />
          <PrivateRoute path="/messaging" component={Messaging} isAuth={isAuth} />
          <PrivateRoute path="/profile" component={Profile} isAuth={isAuth} />
        </main>
      </div>
    );
  }
}

AppLayout.propTypes = {
  logout: React.PropTypes.func.isRequired,
  dispatch: React.PropTypes.func,
  completedProfile: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth }) => {
  return {
    isAuth: auth.isAuth,
    completedProfile: auth.completedProfile
  }
};

const matchDispatchToProps = dispatch => bindActionCreators({logout}, dispatch)

export default connect(mapStateToProps, matchDispatchToProps)(AppLayout);
