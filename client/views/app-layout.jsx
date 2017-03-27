import React, { Component } from 'react';
import { connect } from 'react-redux';

export class AppLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('rendering AppLayout')
    return (
      <div>
        <h1>Hello world</h1>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  console.log(auth.isAuth);
  return {
    isAuth: auth.isAuth,
  }
};

export default connect(mapStateToProps)(AppLayout);
