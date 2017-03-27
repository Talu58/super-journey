import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import NavBar from './navbar/navbar';
import SignUp from './signup/signup';
import Footer from './footer/footer';

export class AppLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('rendering AppLayout', this.props);
    const { isAuth } = this.props;
    return (
      <div>
        <NavBar auth={isAuth}></NavBar>
        <main>
          <Route exact path='/' component={SignUp}/>
          <Route path="/login" render={() => (<div>LOGIN</div>)}/>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    isAuth: auth.isAuth,
  }
};

export default connect(mapStateToProps)(AppLayout);
