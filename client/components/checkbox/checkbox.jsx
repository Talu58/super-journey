import React, { Component } from 'react';
import './_checkbox.sass';

const CheckBox = props => {

  const { containerStyleClassName, styleClassName, label, checked, changeHandler, id } = props;
  let checkboxContainerClass = 'checkbox-container';
  let checkboxClass = 'checkbox';
  let isChecked = true;
  if (containerStyleClassName) {
    checkboxContainerClass += ' ' + containerStyleClassName;
  }

  if (styleClassName) {
    checkboxClass += ' ' + styleClassName;
  }

  if (!checked) {
    isChecked = false;
  }

  return (
    <div className={checkboxContainerClass}>
      <input
        id={id}
        className={checkboxClass}
        type="checkbox"
        checked={isChecked}
        onChange={changeHandler}
      /><label>{label}</label>
    </div>
  );

};

export default CheckBox;
