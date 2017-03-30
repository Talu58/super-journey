import React, { Component } from 'react';
import Button from '../../components/button/button';

export default class SignupStep extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const { buttons, clickHandler } = this.props;
    return (
      <div>
        SignupStep 
        {buttons.map(button => (
            <Button key={button} value={button} clickHandler={clickHandler} name={button}/>
          )
        )}
      </div>
    )
  }
}