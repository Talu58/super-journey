import React, { Component } from 'react';


export default class Button extends Component { 
  render() {
    const { value } = this.props;
    return (
      <div>
          <button>{value}</button>
      </div>
    );
  }
}