import React, { Component } from 'react';
import './_signup.sass';
import InputField from '../../components/input-field/input-field';
import Button from '../../components/button/button';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInputFieldValue: '',
      passwordInputFieldValue: '',
      signupFieldsIncomplete: false
    };
  }

  inputFieldChangeHandler = e => {
    if (e.target.type === 'email') {
      let newEmailValue = e.target.value;
      this.setState({
        emailInputFieldValue: newEmailValue
      });
    } else if (e.target.type === 'password') {
      let newPasswordValue = e.target.value;
      this.setState({
        passwordInputFieldValue: newPasswordValue
      });
    }
  }

  submitSignupHandler = () => {
    if (this.state.emailInputFieldValue === '' || this.state.passwordInputFieldValue === '') {
      this.setState({
        signupFieldsIncomplete: true
      })
    } else {


    }
  }

  render() {
    return (
      <div className="signup-container">
        <h1 className="signup-header">Don't have an account yet? Sign-up here:</h1>
        <div className="signup-inputfields-container">
          <InputField 
            placeholderText="Email"
            type="email"
            changeHandler={this.inputFieldChangeHandler}
            value={this.state.emailInputFieldValue}
          ></InputField>
          <InputField 
            placeholderText="Password"
            type="password"
            changeHandler={this.inputFieldChangeHandler}
            value={this.state.passwordInputFieldValue}
          ></InputField>
          {this.state.signupFieldsIncomplete ?
            <p className="signup-error-message">Please fill up email and password fields</p>
            : null
          }
          <Button 
            value="Sign-up"
            styleClassName="button-signup"
            clickHandler={this.submitSignupHandler}
          ></Button>
        </div>
      </div>
    )
  }
}