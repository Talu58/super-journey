import React, { Component } from 'react';
import './_button.sass';

const Button = props => { 

  const handleClick = e => {
    const { clickHandler } = props;
    if (clickHandler) {
      clickHandler(e);
    }
  };

  const { value, styleClassName, containerStyleClassName, disabled, name, active } = props;
  let isDisabled = disabled === true;
  let buttonContainerClass = 'button-container';
  let buttonClass = 'button';

  if (containerStyleClassName) {
    buttonContainerClass += ' ' + containerStyleClassName;
  }

  if (styleClassName) {
    buttonClass += ' ' + styleClassName;
  }

  if (isDisabled) {
    buttonClass += ' button-disabled';
  }
  if (active) {
    buttonClass += ` ${styleClassName}-active`;
  }
  
  return (
    <div className={buttonContainerClass}>
        <button
          name={name}
          className={buttonClass}
          onClick={handleClick}
          disabled={isDisabled}
        >{value}</button>
    </div>
  );

}

export default Button;
