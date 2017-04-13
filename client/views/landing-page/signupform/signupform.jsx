import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import './_signupform.sass';
import { userSignUpRequest } from '../../../actions/auth/authActions';
import InputField from '../../../components/input-field/input-field';
import Button from '../../../components/button/button';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFieldsValues: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      },
      errors: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      }
    };

    this.inputFieldChangeHandler = this.inputFieldChangeHandler.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.submitSignupHandler = this.submitSignupHandler.bind(this);
  }

  inputFieldChangeHandler = e => {
    let newInputFieldValue = e.target.value;
    let newInputFieldsValues = {
      ...this.state.inputFieldsValues
    };
    newInputFieldsValues[e.target.name] = newInputFieldValue;
    this.setState({
      inputFieldsValues: newInputFieldsValues
    });
  }

  isFormValid() {
    let isValid = true;
    for (let key in this.state.inputFieldsValues) {
      const newErrors = this.state.errors;
      let errorMessage;
      if (this.state.inputFieldsValues[key] === '') {
        errorMessage = `* ${key} field is required`;
        isValid = false;
      } else {
        errorMessage = '';
      }
      newErrors[key] = errorMessage;
      this.setState({
        error: newErrors
      });
    }
    return isValid;
  }

  submitSignupHandler() {
    const isValid = this.isFormValid();
    if (isValid) {
      const { userSignUpRequest } = this.props;
      const newUser = {
        ...this.state.inputFieldsValues
      };
      userSignUpRequest(newUser);
    }
  }

  render() {
    const { isAuth, completedProfile } = this.props;
    return (
      <div>
      {isAuth && completedProfile ? 
        <Redirect to="/home"/> 
        : ( isAuth ?
        <Redirect to="/signup"/>
        : <div className="signup-container">
          <h1 className="signup-header">Don't have an account yet? Sign-up here:</h1>
          <section className="signup-inputfields-container">
            <div className="signup-input-field-container">
              <InputField 
                placeholderText="Firstname"
                name="firstname"
                type="text"
                changeHandler={this.inputFieldChangeHandler}
                value={this.state.inputFieldsValues.firstname}
              />
              {this.state.errors.firstname ?
                <p className="signup-error-message">{this.state.errors.firstname}</p>
                : <p className="signup-error-message"></p>
              }
            </div>
            <div className="signup-input-field-container">
              <InputField 
                placeholderText="Lastname"
                name="lastname"
                type="text"
                changeHandler={this.inputFieldChangeHandler}
                value={this.state.inputFieldsValues.lastname}
              />
              {this.state.errors.lastname ?
                <p className="signup-error-message">{this.state.errors.lastname}</p>
                : <p className="signup-error-message"></p>
              }
            </div>
            <div className="signup-input-field-container">
              <InputField 
                placeholderText="Email"
                type="email"
                name="email"
                changeHandler={this.inputFieldChangeHandler}
                value={this.state.inputFieldsValues.email}
              />
              {this.state.errors.email ?
                <p className="signup-error-message">{this.state.errors.email}</p>
                : <p className="signup-error-message"></p>
              }
            </div>
            <div className="signup-input-field-container">
              <InputField 
                placeholderText="Password"
                type="password"
                name="password"
                changeHandler={this.inputFieldChangeHandler}
                value={this.state.inputFieldsValues.password}
              />
              {this.state.errors.password ?
                <p className="signup-error-message">{this.state.errors.password}</p>
                : <p className="signup-error-message"></p>
              }
            </div>
          </section>
          <Button 
            value="Sign-up"
            styleClassName="button-primary"
            clickHandler={this.submitSignupHandler}
          />
        </div>
        )}
        </div>
    )
  }
}

SignUpForm.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired,
  completedProfile: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth }) => {
  return {
    isAuth: auth.isAuth,
    completedProfile: auth.completedProfile
  }
};

const matchDispatchToProps = dispatch => bindActionCreators({userSignUpRequest}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(SignUpForm);
