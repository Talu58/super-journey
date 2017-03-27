import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './navbar/navbar';

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
