import React, { Component, PropTypes } from 'react';
import './_signup-step.sass';
import Button from '../../components/button/button';

export default class SignupStep extends Component {
  render() {
    const { buttons, clickHandler, disabled, header } = this.props;
    return (
      <div className="signup-step-container">
        <h1 className="signup-step-header">{header}</h1>
        <section className="signup-step-buttons-container">
          {Object.keys(buttons).map(button => {
            const buttonNameFormatted = button.replace(/\s/g, '').toLowerCase();
            return (
                <Button 
                  key={button}
                  value={button}
                  disabled={disabled && !buttons[button]}
                  clickHandler={clickHandler}
                  name={button}
                  active={buttons[button]}
                  styleClassName={`button-signup-step-option button-signup-step-option-${buttonNameFormatted}`}
                />
            );
          }
          )}
        </section>
      </div>
    )
  }
};

SignupStep.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  buttons: PropTypes.object.isRequired,
  disabled: PropTypes.bool
};

