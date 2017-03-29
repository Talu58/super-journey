import React, { Component } from 'react';
import './_signup-steps.sass';
import Button from '../../components/button/button';

export default class SignUpSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    }
  }

  render() {
    return  (
      <div className="signup-steps-container">
        <h1>SignUpSteps</h1>
        <section>
          <h2>Who are you?</h2>
          <Button value="Donnor"/>
          <Button value="Non-Profit Organisation"/>
        </section>
        <section>
          <Button value="Prev"/>
          <Button value="Next"/>
        </section>
      </div>
    );
  }
}




