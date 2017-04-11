import React, { Component } from 'react';
import './_text-area-field.sass'

 const TextAreaField = props => {
  
  const { placeholderText, containerStyleClassName, styleClassName, changeHandler, value, rows, name } = props;
  let textAreaFieldContainerClass = 'textAreaField-container';
  let textAreaFieldClass = 'textAreaField';
  const textAreaName = name || '';

  if (containerStyleClassName) {
    textAreaFieldContainerClass += ' ' + containerStyleClassName;
  }

  if (styleClassName) {
    textAreaFieldClass += ' ' + styleClassName;
  }

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
  );
}

export default TextAreaField;
