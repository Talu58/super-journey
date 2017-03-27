import React, { Component } from 'react';
import './_signup.sass';
import InputField from '../../components/input-field/input-field';
import Button from '../../components/button/button';

export default class SignUp extends Component {
  render() {
    return (
      <div className="signup-container">
        <h1 className="signup-header">Don't have an account yet? Sign-up here:</h1>
        <div className="signup-inputfields-container">
          <InputField 
            placeholderText="Email"
            type="email"
          ></InputField>
          <InputField 
            placeholderText="Password"
            type="password"
          ></InputField>
          <Button 
            value="Sign-up"
            styleClassName="button-signup"
          ></Button>
        </div>
      </div>
    )
  }
}