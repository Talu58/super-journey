import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import NavBar from './navbar/navbar';
import SignUpForm from './signup/signup';
import Footer from './footer/footer';

export class AppLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuth, completedProfile, dispatch } = this.props;
    return (
      <div className="app-layout-container">
        <NavBar isAuth={isAuth}></NavBar>
        <main>
          <Route exact path='/' render={() => (
            isAuth ?  (completedProfile ? <Redirect to="/home" /> 
            : <Redirect to="/signup" />)
            : <SignUpForm/> 
          )}/>
          <Route path="/home" render={() => (
            isAuth ? <div>HOME</div>
            : <Redirect to="/" />
          )}/>
          <Route path="/login" render={() => (<div>LOGIN</div>)}/>
          <Route path="/signup" render={() => (<div>SIGNUP</div>)}/>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  console.log('mapStateToProps isAuth:', auth.isAuth);
  return {
    isAuth: auth.isAuth,
    completedProfile: auth.completedProfile
  }
};

export default connect(mapStateToProps)(AppLayout);
