import React, { Component } from 'react';
import SignUpForm from '../signupform/signupform';
import Button from '../../components/button/button';
import axios from 'axios';

export default class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.demoButtonClicked = this.demoButtonClicked.bind(this);
  }

  demoButtonClicked() {
    console.log('demo button clicked');
    axios.get('/user/dummy');
  }

  render() {
    return (
      <div>
        <div>
          <Button
            value="Try our Demo"
            clickHandler={this.demoButtonClicked}
          />
        </div>
        <SignUpForm/>
      </div>
    );
  }
}
