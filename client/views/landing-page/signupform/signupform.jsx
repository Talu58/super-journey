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
      fieldIncomplete: {
        firstname: false,
        lastname: false,
        email: false,
        password: false
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
    for (let key in this.state.inputFieldsValues) {
      if (this.state.inputFieldsValues[key] === '') {
        return false;
      }
    }
    return true;
  }

  submitSignupHandler() {
    const isValid = this.isFormValid();
    if (isValid) {
      const { userSignUpRequest } = this.props;
      const newUser = {
        ...this.state.inputFieldsValues
      };
      userSignUpRequest(newUser);
    } else {
      let newFieldIncomplete = this.state.fieldIncomplete;
      for (let key in this.state.inputFieldsValues) {
        if (this.state.inputFieldsValues[key] === '') {
          newFieldIncomplete[key] = true;
        } else {
          newFieldIncomplete[key] = false;
        }
      }
      this.setState({
        fieldIncomplete: newFieldIncomplete
      });
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
          <div className="signup-inputfields-container">
            <InputField 
              placeholderText="Firstname"
              name="firstname"
              type="text"
              changeHandler={this.inputFieldChangeHandler}
              value={this.state.inputFieldsValues.firstname}
            />
            {this.state.fieldIncomplete.firstname ?
              <span className="signup-error-message">* Firstname field required</span>
              : null
            }
            <InputField 
              placeholderText="Lastname"
              name="lastname"
              type="text"
              changeHandler={this.inputFieldChangeHandler}
              value={this.state.inputFieldsValues.lastname}
            />
            {this.state.fieldIncomplete.lastname ?
              <span className="signup-error-message">* Lastname field required</span>
              : null
            }
            <InputField 
              placeholderText="Email"
              name="email"
              type="email"
              changeHandler={this.inputFieldChangeHandler}
              value={this.state.inputFieldsValues.email}
            />
            {this.state.fieldIncomplete.email ?
              <span className="signup-error-message">* Email field required</span>
              : null
            }
            <InputField 
              placeholderText="Password"
              name="password"
              type="password"
              changeHandler={this.inputFieldChangeHandler}
              value={this.state.inputFieldsValues.password}
            />
            {this.state.fieldIncomplete.password ?
              <span className="signup-error-message">* Password field required</span>
              : null
            }
            <Button 
              value="Sign-up"
              styleClassName="button-primary"
              clickHandler={this.submitSignupHandler}
            />
          </div>
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
