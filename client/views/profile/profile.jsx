import React, { Component, PropTypes } from 'react';
import './_profile.sass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import InputField from '../../components/input-field/input-field';
import Button from '../../components/button/button';
import { getUserInformation } from '../../actions/auth/authActions';
import jwt from 'jsonwebtoken';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordChangeMessage: '',
      passwordChangeConfirmed: true,
      shouldChangePassword: false,
      inputFieldsValues: {
        previousPassword: '',
        newPassword: '',
        newPassword2: '',
      },
      errors: {
        previousPassword: '',
        newPassword: '',
        newPassword2: '',
      }
    }
    this.changePassword = this.changePassword.bind(this);
    this.inputFieldChangeHandler = this.inputFieldChangeHandler.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.savePassword = this.savePassword.bind(this);
  }

  componentWillMount() {
    const { getUserInformation } = this.props;
    const { email } = jwt.decode(localStorage.jwtToken);
    getUserInformation(email);
  }

  changePassword() {
    this.setState({
      shouldChangePassword: true
    });
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
        errorMessage = '* This field is required';
        isValid = false;
      } else {
        errorMessage = '';
      }
      newErrors[key] = errorMessage;
      this.setState({
        error: newErrors
      });
    }
    if (this.state.inputFieldsValues.newPassword !== this.state.inputFieldsValues.newPassword2) {
      const errorMessage = 'New passwords don\'t match';
      const newErrors = this.state.errors;
      newErrors.newPassword = errorMessage;
      newErrors.newPassword2 = errorMessage;
      isValid = false;
      this.setState({
        error: newErrors
      });
    }
    return isValid;
   }

  savePassword() {
    const isValid = this.isFormValid();
    if (isValid) {
      const { previousPassword, newPassword } = this.state.inputFieldsValues;
      const { email } = this.props;
      const userInformation = {
        email,
        previousPassword,
        newPassword
      };
      axios.post('/user/password/change', userInformation).then(confirmation => {
        let newInputFieldsValues = {}
        for (let key in this.state.inputFieldsValues) {
          newInputFieldsValues[key] = ''
        }
        if (confirmation.data) {
          this.setState({
            passwordChangeMessage: 'Password changed successfully',
            inputFieldsValues: newInputFieldsValues,
            passwordChangeConfirmed: true
          });
        } else {
            this.setState({
              passwordChangeMessage: 'Incorrect password',
              inputFieldsValues: newInputFieldsValues,
              passwordChangeConfirmed: false
            });
        }
      });
    }
  }

  render() {
    const { role, email, firstname, lastname } = this.props;
    let passwordChangeMessageClass = 'password-change-message';

    if (this.state.passwordChangeMessage !== '') {
      if (this.state.passwordChangeConfirmed) {
        passwordChangeMessageClass += ' ' + 'password-change-message-confirmed'
      } else {
        passwordChangeMessageClass += ' ' + 'password-change-message-error'
      }
    }

    return (
      <div className="profile-view">
        <div className="profile-container">
          <h1 className="profile-information-header">Your Profile information:</h1>
          <section className="profile-information-container">
            <p>Firstname:</p>
            <p className="profile-details">{firstname}</p>
            <p>Lastname:</p>
            <p className="profile-details">{lastname}</p>
            <p>Email:</p>
            <p className="profile-details">{email}</p>
          { this.state.shouldChangePassword ?
            <div className="password-change-input-fields-container">
              <InputField
                name="previousPassword"
                placeholderText="Enter previous password"
                styleClassName="password-change-input-field"
                value={this.state.inputFieldsValues.previousPassword}
                type="password"
                changeHandler={this.inputFieldChangeHandler}
              />
              {this.state.errors.previousPassword ?
                <p className="password-change-error-message">{this.state.errors.previousPassword}</p>
                : <p className="password-change-error-message"></p>
              }
              <InputField
                name="newPassword"
                placeholderText="Enter new password"
                styleClassName="password-change-input-field"
                value={this.state.inputFieldsValues.newPassword}
                type="password"
                changeHandler={this.inputFieldChangeHandler}
              />
              {this.state.errors.newPassword ?
                <p className="password-change-error-message">{this.state.errors.newPassword}</p>
                : <p className="password-change-error-message"></p>
              }
              <InputField
                name="newPassword2"
                placeholderText="Enter new password again"
                styleClassName="password-change-input-field"
                value={this.state.inputFieldsValues.newPassword2}
                type="password"
                changeHandler={this.inputFieldChangeHandler}
              />
              {this.state.errors.newPassword2 ?
                <p className="password-change-error-message">{this.state.errors.newPassword2}</p>
                : <p className="password-change-error-message"></p>
              }
              <Button
              value="Save Password"
              containerStyleClassName="profile-button-container"
              styleClassName="profile-button"
              clickHandler={this.savePassword}
            />
            </div>
          : <Button
              value="Change Password"
              containerStyleClassName="profile-button-container"
              styleClassName="profile-button"
              clickHandler={this.changePassword}
            />
          }
          </section>
        </div>
        <div className="password-change-message-container">
          <p className={passwordChangeMessageClass}>{this.state.passwordChangeMessage}</p>
        </div>
      </div>
    );
  }
};

Profile.propTypes = {
  role: PropTypes.object,
  email: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired
};

const mapStateToProps = ({ auth }) => {
  return {
    role: auth.role,
    email: auth.email,
    firstname: auth.firstname,
    lastname: auth.lastname
  };
};

const matchDispatchToProps = dispatch => bindActionCreators({
  getUserInformation
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Profile);
