import React, { Component } from 'react';
import './_input-field.sass'

const InputField = props => {

  const { placeholderText, containerStyleClassName, styleClassName, type, changeHandler, value, name } = props;
  let inputfieldContainerClass = 'inputfield-container';
  let inputfieldClass = 'inputfield';
  const inputName = name || '';

  if (containerStyleClassName) {
    inputfieldContainerClass += ' ' + containerStyleClassName;
  }

  if (styleClassName) {
    inputfieldClass += ' ' + styleClassName;
  }

  return (
    <div className={inputfieldContainerClass}>
      <input
        placeholder={placeholderText}
        className={inputfieldClass}
        type={type}
        onChange={changeHandler}
        value={value}
        name={inputName}
      />
    </div>
  );

}

export default InputField;