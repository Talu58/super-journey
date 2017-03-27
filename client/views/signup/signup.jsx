import React, { Component } from 'react';
import './_signup.sass';
import InputField from '../../components/input-field/input-field';
import Button from '../../components/button/button';

export default class SignUp extends Component {
  render() {
    return (
      <div className="signup-container">
        <h1>Don't have an account yet? Sign-up here:</h1>
        <div className="signup-inputfields-container">
          <InputField 
            placeholder="Email"
            type="email"
          ></InputField>
          <InputField 
            placeholder="Password"
            type="password"
          ></InputField>
          <Button value="Sign-up"></Button>
        </div>
      </div>
    )
  }
}