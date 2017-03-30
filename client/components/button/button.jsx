import React, { Component } from 'react';
import './_button.sass';

export default class Button extends Component { 

  handleClick = e => {
    const { clickHandler } = this.props;
    if (clickHandler) {
      clickHandler(e);
    }
  }

  render() {
    const { value, styleClassName, containerStyleClassName, disabled, name } = this.props;
    let isDisabled = disabled === true;
    let buttonContainerClass = 'button-container ' + containerStyleClassName;
    let buttonClass = 'button ' + styleClassName;

    if (isDisabled) {
      buttonClass += ' button-disabled';
    }
    
    return (
      <div className={buttonContainerClass}>
          <button name={name} className={buttonClass} onClick={this.handleClick} disabled={isDisabled}>{value}</button>
      </div>
    );
  }
}