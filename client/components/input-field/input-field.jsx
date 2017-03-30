import React, { Component } from 'react';
import './_input-field.sass'

export default class InputField extends Component {
  
  render() {
    const { placeholderText, containerStyleClassName, styleClassName, type, changeHandler, value, name } = this.props;
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
    )
  }
}