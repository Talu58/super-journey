import React, { Component } from 'react';
import Button from '../../components/button/button';

export default class SignupStep extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const { buttons, clickHandler } = this.props;
    console.log('buttons', buttons);
    return (
      <div>
        SignupStep 
        {Object.keys(buttons).map(button => (
            <Button 
              key={button}
              value={button}
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