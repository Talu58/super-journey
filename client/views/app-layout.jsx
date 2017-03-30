import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import NavBar from './navbar/navbar';
import SignUpForm from './signupform/signupform';
import Footer from './footer/footer';
import SignUpSteps from './signup-steps/signup-steps';
import Home from './home/home';
import Profile from './profile/profile';
import PrivateRoute from '../utils-router/private-route';

export class AppLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuth, completedProfile, dispatch } = this.props;
    return (
      <div className="app-layout-container">
        <NavBar isAuth={isAuth} completedProfile={completedProfile} />
        <main>
          <Route exact path='/' component={SignUpForm} />
          <Route path="/signup" component={SignUpSteps} />
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

export default connect(mapStateToProps)(AppLayout);
