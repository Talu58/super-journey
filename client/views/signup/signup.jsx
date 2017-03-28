import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './_signup.sass';
import { userSignedUp } from '../../actions/auth/authActions';
import InputField from '../../components/input-field/input-field';
import Button from '../../components/button/button';

class SignUp extends Component {
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
      const { userSignedUp } = this.props;
      const newUser = {
        email: this.state.emailInputFieldValue,
        password: this.state.signupFieldsIncomplete
      };
      userSignedUp(newUser);
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

const mapStateToProps = ({ auth }) => {
  return {
    isAuth: auth.isAuth,
  }
};

const matchDispatchToProps = dispatch => bindActionCreators({userSignedUp: userSignedUp}, dispatch)

export default connect(mapStateToProps, matchDispatchToProps)(SignUp);
