import React, { Component } from 'react';
import './_button.sass';

export default class Button extends Component { 

  handleClick = e => {
    const { clickHandler } = this.props;
    clickHandler(e);
  }

  render() {
    const { value, styleClassName, containerStyleClassName } = this.props;
    let buttonContainerClass = 'button-container ' + containerStyleClassName;
    let buttonClass = 'button ' + styleClassName;
    
    return (
      <div className={buttonContainerClass}>
          <button className={buttonClass} onClick={this.handleClick}>{value}</button>
      </div>
    );
  }
}