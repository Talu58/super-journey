import React, { Component } from 'react';
import './text-field.sass'

export default class TextInput extends Component {
  
  render() {
    const { placeholderText, containerStyleClassName, styleClassName, type, changeHandler, value } = this.props;
    let inputfieldContainerClass = 'inputfield-container ' + containerStyleClassName;
    let inputfieldClass = 'inputfield ' + styleClassName;

    return (
      <div className={inputfieldContainerClass}>
        <input
          placeholder={placeholderText}
          className={inputfieldClass}
          type={type}
          onChange={changeHandler}
          value={value}
        />
      </div>
    )
  }
}