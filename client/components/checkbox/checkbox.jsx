import React, { Component } from 'react';

export default class CheckBox extends Component {
  render() {
    const { containerStyleClassName, styleClassName, label, checked, changeHandler, id } = this.props;
    let checkboxContainerClass = 'checkbox-container ' + containerStyleClassName;
    let checkboxClass = 'checkbox ' + styleClassName;
    let isChecked = true;
    if  (!checked) {
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
  }
}

