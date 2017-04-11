import React, { Component } from 'react';
import './_input-field.sass'

const InputField = props => {

  const { placeholderText, containerStyleClassName, styleClassName, type, changeHandler, value, name } = props;
  let inputfieldContainerClass = 'inputfield-container ' + containerStyleClassName;
  let inputfieldClass = 'inputfield ' + styleClassName;
  const inputName = name || '';

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