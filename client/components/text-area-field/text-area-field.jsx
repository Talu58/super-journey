import React, { Component } from 'react';
import './_text-area-field.sass'

export default class TextAreaField extends Component {
  
  render() {
    const { placeholderText, containerStyleClassName, styleClassName, changeHandler, value, rows, name } = this.props;
    let textAreaFieldContainerClass = 'textAreaField-container ' + containerStyleClassName;
    let textAreaFieldClass = 'textAreaField ' + styleClassName;
    const textAreaName = name || '';


    return (
      <div className={textAreaFieldContainerClass}>
        <textarea
          placeholder={placeholderText}
          className={textAreaFieldClass}
          onChange={changeHandler}
          value={value}
          rows={rows}
          name={textAreaName}
        />
      </div>
    )
  }
}