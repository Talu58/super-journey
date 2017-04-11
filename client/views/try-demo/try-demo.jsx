import React, { Component } from 'react';
import './_try-demo.sass';
import Button from '../../components/button/button';
import axios from 'axios';

export default class TryDemo extends Component {
  constructor(props) {
    super(props)
    this.demoButtonClicked = this.demoButtonClicked.bind(this);
  }

  demoButtonClicked() {
    axios.get('/user/dummy');
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
      </div>
    );
  }
}
