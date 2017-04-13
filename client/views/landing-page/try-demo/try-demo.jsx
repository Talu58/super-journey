import React, { Component, PropTypes } from 'react';
import './_try-demo.sass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginDemoUser } from '../../../actions/auth/authActions';
import Button from '../../../components/button/button';
import axios from 'axios';

class TryDemo extends Component {
  constructor(props) {
    super(props);
    this.demoButtonClicked = this.demoButtonClicked.bind(this);
  }

  demoButtonClicked() {
    const { loginDemoUser } = this.props; 
    axios.get('/user/dummy/non-profit')
      .then(() => {
        return axios.get('/user/dummy/donor')
        .then(user => {
          loginDemoUser(user);
        });
      })
  }

  render() {
    return (
      <div className="try-demo-container" >
        <h1 className="try-demo-header" >Not sure you want to sign-up? Try our demo here:</h1>
        <Button
          value="Try our Demo"
          clickHandler={this.demoButtonClicked}
          styleClassName="button-primary"
        />
        <p className="try-demo-text" >Get setup with a dummy account and test our interface!</p>
      </div>
    );
  }
};

TryDemo.propTypes = {
  loginDemoUser: React.PropTypes.func.isRequired
};

const matchDispatchToProps = dispatch => bindActionCreators({loginDemoUser}, dispatch);

export default connect(null, matchDispatchToProps)(TryDemo);
