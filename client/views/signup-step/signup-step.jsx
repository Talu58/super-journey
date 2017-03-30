import React, { Component } from 'react';
import './_signup-step.sass';
import Button from '../../components/button/button';

export default class SignupStep extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const { buttons, clickHandler, disabled } = this.props;
    console.log('buttons', buttons);
    return (
      <div className="signup-step-buttons-container">
        {Object.keys(buttons).map(button => (
            <Button 
              key={button}
              value={button}
              disabled={disabled && !buttons[button]}
              clickHandler={clickHandler}
              name={button}
              active={buttons[button]}
              styleClassName="button-signup-step-option"
              />
          )
        )}
      </div>
    )
  }
}