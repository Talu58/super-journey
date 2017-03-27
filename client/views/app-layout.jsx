import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './navbar/navbar';

export class AppLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('rendering AppLayout')
    return (
      <div>
        <NavBar></NavBar>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  console.log(auth.isAuth);
  return {
    isAuth: auth.isAuth,
  }
};

export default connect(mapStateToProps)(AppLayout);
