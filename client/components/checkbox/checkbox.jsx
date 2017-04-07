import React, { Component } from 'react';

export default class CheckBox extends Component {
  render() {
    const { containerStyleClassName, styleClassName, label } = this.props;
    let checkboxContainerClass = 'checkbox-container ' + containerStyleClassName;
    let checkboxClass = 'checkbox ' + styleClassName;

    return (
      <div className={checkboxContainerClass}>
        <input
          className={checkboxClass}
          type="checkbox"
        /><label>{label}</label>
      </div>
    );
  }
}

