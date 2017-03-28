import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import './_signup.sass';
import { userSignedUpRequest } from '../../actions/auth/authActions';
import InputField from '../../components/input-field/input-field';
import Button from '../../components/button/button';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInputFieldValue: '',
      passwordInputFieldValue: '',
      signupFieldsIncomplete: false,
    };
    
    this.inputFieldChangeHandler = this.inputFieldChangeHandler.bind(this);
    this.submitSignupHandler = this.submitSignupHandler.bind(this);
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

  submitSignupHandler() {
    const props = this.state;
    if (this.state.emailInputFieldValue === '' || this.state.passwordInputFieldValue === '') {
      this.setState({
        signupFieldsIncomplete: true
      })
    } else {
      const { userSignedUpRequest } = this.props;
      const newUser = {
        email: this.state.emailInputFieldValue,
        password: this.state.passwordInputFieldValue
      };
      userSignedUpRequest(newUser)
      .then(userInfo => {
        console.log('userInfo', props);
        
        <Redirect to={{
          pathname: '/home',
          state: { from: props.location }
        }}/>
      });
      //dispatch action to verify user not in DB
      // if in db and didn't complete signup process => send to correct step in the process
      // else if in db and completed signup process => log in
      // else send to signup process

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

SignUpForm.propTypes = {
  userSignedUpRequest: React.PropTypes.func.isRequired
}

const matchDispatchToProps = dispatch => bindActionCreators({userSignedUpRequest: userSignedUpRequest}, dispatch)

export default connect(null, matchDispatchToProps)(SignUpForm);
