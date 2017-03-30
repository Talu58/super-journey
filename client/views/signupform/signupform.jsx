import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import './_signupform.sass';
import { userSignedUpRequest } from '../../actions/auth/authActions';
import InputField from '../../components/input-field/input-field';
import Button from '../../components/button/button';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInputFieldValue: '',
      passwordInputFieldValue: '',
      emailFieldIncomplete: false,
      passwordFieldIncomplete: false,
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
    if (this.state.emailInputFieldValue === '' && this.state.passwordInputFieldValue === '') {
      this.setState({
        emailFieldIncomplete: true,
        passwordFieldIncomplete: true
      });
    } else if (this.state.emailInputFieldValue === '') {
      this.setState({
        emailFieldIncomplete: true,
        passwordFieldIncomplete: false
      });
    } else if (this.state.passwordInputFieldValue === '') {
      this.setState({
        emailFieldIncomplete: false,
        passwordFieldIncomplete: true
      });
    } else {
      const { userSignedUpRequest } = this.props;
      const newUser = {
        email: this.state.emailInputFieldValue,
        password: this.state.passwordInputFieldValue
      };
      userSignedUpRequest(newUser)
    }
  }

  render() {
    const { isAuth } = this.props;
    console.log('isAuth', isAuth)
    return (
      <div>
      {isAuth ? 
        <Redirect to="/signup"/>
        : <div className="signup-container">
          <h1 className="signup-header">Don't have an account yet? Sign-up here:</h1>
          <div className="signup-inputfields-container">
            <InputField 
              placeholderText="Email"
              type="email"
              changeHandler={this.inputFieldChangeHandler}
              value={this.state.emailInputFieldValue}
            ></InputField>
            {this.state.emailFieldIncomplete ?
              <span className="signup-error-message">Email field required</span>
              : null
            }
            <InputField 
              placeholderText="Password"
              type="password"
              changeHandler={this.inputFieldChangeHandler}
              value={this.state.passwordInputFieldValue}
            ></InputField>
            {this.state.passwordFieldIncomplete ?
              <span className="signup-error-message">Password field required</span>
              : null
            }
            <Button 
              value="Sign-up"
              styleClassName="button-signup"
              clickHandler={this.submitSignupHandler}
            />
          </div>
        </div>
        }
        </div>
    )
  }
}

SignUpForm.propTypes = {
  userSignedUpRequest: React.PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => {
  return {
    isAuth: auth.isAuth,
    completedProfile: auth.completedProfile
  }
};

const matchDispatchToProps = dispatch => bindActionCreators({userSignedUpRequest: userSignedUpRequest}, dispatch)

export default connect(mapStateToProps, matchDispatchToProps)(SignUpForm);
