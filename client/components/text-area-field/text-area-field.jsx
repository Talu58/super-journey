import React, { Component } from 'react';
import './_text-area-field.sass'

 const TextAreaField = props => {
  
  const { placeholderText, containerStyleClassName, styleClassName, changeHandler, value, rows, name } = props;
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
  );
}

export default TextAreaField;
