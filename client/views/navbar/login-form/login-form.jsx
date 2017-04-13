import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputField from '../../../components/input-field/input-field';
import Button from '../../../components/button/button';
import { userLoginRequest } from '../../../actions/auth/authActions';
import './_login-form.sass';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFieldsValues: {
        email: '',
        password: '',
      },
      errors: {
        email: '',
        password: '',
      },
    }
    this.inputFieldChangeHandler = this.inputFieldChangeHandler.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.submitLoginHandler = this.submitLoginHandler.bind(this);
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

  submitLoginHandler() {
    const isValid = this.isFormValid();
    if (isValid) {
      const { userLoginRequest } = this.props;
      const user = {
        ...this.state.inputFieldsValues
      };
      userLoginRequest(user);
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
        : <div className="login-form-container">
            <div className="login-form-field-container">
              <InputField
                placeholderText="Email address"
                type="email"
                name="email"
                changeHandler={this.inputFieldChangeHandler}
                value={this.state.emailInputFieldValue}
                containerStyleClassName="login-form-input-field-container"
              />
              {this.state.errors.email !== '' ?
                <p className="login-error-message">{this.state.errors.email}</p>
                : <p className="login-error-message"></p>
              }
            </div>
            <div className="login-form-field-container">
              <InputField
                placeholderText="Password"
                type="password"
                name="password"
                changeHandler={this.inputFieldChangeHandler}
                value={this.state.passwordInputFieldValue}
                containerStyleClassName="login-form-input-field-container"
              />
              {this.state.errors.password !== '' ?
                <p className="login-error-message">{this.state.errors.password}</p>
                : <p className="login-error-message"></p>
              }
            </div>
            <Button
              value="Login"
              containerStyleClassName="navbar-login-button-container"
              styleClassName="button-primary navbar-login-button"
              clickHandler={this.submitLoginHandler}
            />
          </div>
        )}
      </div>
    )
  }
}

LoginForm.propTypes = {
  userLoginRequest: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  completedProfile: PropTypes.bool.isRequired
};

const mapStateToProps = ({ auth }) => {
  return {
    isAuth: auth.isAuth,
    completedProfile: auth.completedProfile
  };
};

const matchDispatchToProps = dispatch => bindActionCreators({userLoginRequest}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(LoginForm);


