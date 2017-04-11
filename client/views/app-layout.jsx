import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import NavBar from './navbar/navbar';
import SignUpForm from './signupform/signupform';
import LandingPage from './landing-page/landing-page';
import Footer from './footer/footer';
import SignUpSteps from './signup-steps/signup-steps';
import Home from './home/home';
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
          <PrivateRoute path="/profile" component={Profile} isAuth={isAuth} />
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    isAuth: auth.isAuth,
    completedProfile: auth.completedProfile
  }
};

const matchDispatchToProps = dispatch => bindActionCreators({logout}, dispatch)

export default connect(mapStateToProps, matchDispatchToProps)(AppLayout);
