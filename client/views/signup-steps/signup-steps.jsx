import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import './_signup-steps.sass';
import { userCompletedSignUpRequest, userUploadedImage } from '../../actions/auth/authActions';
import Button from '../../components/button/button';
import SignUpStep from '../signup-step/signup-step';
import OrganizationForm from '../organization-form/organization-form';

class SignUpSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      role: { Donor: false, 'Non-Profit Organisation': false },
      industry: {Healthcare: false, Tech: false, Climate: false, Inclusion: false, 'Global Change': false},
      organization: {name: '', description: ''},
      file: {},
      hasRole: false,
      hasCompletedStep: false
    }
    this.clickOptionHandler = this.clickOptionHandler.bind(this);
    this.fieldChangeHandler = this.fieldChangeHandler.bind(this);
    this.uploadFileHandler = this.uploadFileHandler.bind(this);
    this.clickPrevHandler = this.clickPrevHandler.bind(this);
    this.clickNextHandler = this.clickNextHandler.bind(this);
    this.clickSaveHandler = this.clickSaveHandler.bind(this);
  }

  clickOptionHandler(e) {
    if (this.state.hasRole && this.state.step === 1 && this.state.role[e.target.name]) {
      const { role } = this.state;
      const newState = {
        ...role,
        [e.target.name]: !this.state.role[e.target.name],
      };
      this.setState({
        role: newState,
        hasRole: false,
        hasCompletedStep: false
      });
    } else if (this.state.step === 1) {
      const { role } = this.state;
      const newState = {
        ...role,
        [e.target.name]: !this.state.role[e.target.name],
      };
      this.setState({
        role: newState,
        hasRole: true,
        hasCompletedStep: true
      });
    } else {
      const { industry } = this.state;
      const newState = {
        ...industry,
        [e.target.name]: !this.state.industry[e.target.name],
      };
      this.setState({
        industry: newState,
        hasRole: true,
        hasCompletedStep: true
      });
    }
  }

  fieldChangeHandler(e) {
    const { organization } = this.state;
    const newState = {
      ...organization,
      [e.target.name]: e.target.value
    };
    if (newState.name !== '' && newState.description !== '') {
      this.setState({
        organization: newState,
        hasCompletedStep: true
      });
    } else {
      this.setState({
        organization: newState,
        hasCompletedStep: false
      });
    }
  }

  uploadFileHandler(e) {
    let file = {
      file: e.target.files[0],
    };
    this.setState({
      file
    });
  }

  clickPrevHandler() {
    const { step } = this.state;
    this.setState({
      step: step-1
    });
  }

  clickNextHandler() {
    const { step } = this.state;
    this.setState({
      step: step+1,
      hasCompletedStep: false
    });
  }

  clickSaveHandler() {
    const { userCompletedSignUpRequest, userUploadedImage, email } = this.props;
    const { role, industry, organization, file } = this.state;
    const newUser = {
      role,
      industry,
      organization,
      email,
    };
    userCompletedSignUpRequest(newUser);
    if (!role.Donor) {
      var formData = new FormData();
      formData.append('upload', file.file);
      userUploadedImage(formData);
    }
  }

  render() {
    const { completedProfile } = this.props;
    let display = '';
    switch (this.state.step) {
      case 1:
        display = (
          <div>
            <SignUpStep
              disabled={this.state.hasRole}
              buttons={this.state.role}
              clickHandler={this.clickOptionHandler}
              header="Are you a Donor or a Non-Profit Organizations"
            />
          </div>
        );
        break;
      case 2:
        display = (
          <div>
            <SignUpStep
              buttons={this.state.industry}
              clickHandler={this.clickOptionHandler}
              header="Choose the best matching categories for your project"
            />
          </div>
        );
        break;
      case 3:
        display = (
          <div>
            <OrganizationForm 
              changeHandler={this.fieldChangeHandler}
              uploadFileHandler={this.uploadFileHandler}
              values={this.state.organization}
              header="Give us some details about your organization"
            />
          </div>
        );
        break;
      default: 
        display = (
          <div />
        );
    }
    return  (
      <div>
      { completedProfile ?
        <Redirect to="/home" />
        :
        (<div className="signup-steps-container">
          <div className="signup-step-contianer">
            {display}
          </div>
          <div className="signup-navigation-button-container">
            {this.state.step === 1 ? 
              <Button
                disabled={true}
                styleClassName="button-primary"
                value="Prev"
              />
              : 
              <Button
                clickHandler={this.clickPrevHandler}
                value="Prev"
                styleClassName="button-primary"
              />
            }
            {(this.state.step === 2 && this.state.role.Donor) || this.state.step === 3 ? 
              <Button 
                disabled={!this.state.hasCompletedStep}
                clickHandler={this.clickSaveHandler}
                value="Save"
                styleClassName="button-primary"
              />
              : 
              <Button
                disabled={!this.state.hasCompletedStep}
                clickHandler={this.clickNextHandler}
                styleClassName="button-primary"
                value="Next"
              />
            }
          </div>
        </div>
        )
      }
      </div>
    );
  }
};

SignUpSteps.propTypes = {
  userCompletedSignUpRequest: PropTypes.func.isRequired,
  completedProfile: PropTypes.bool.isRequired
};

const mapStateToProps = ({ auth }) => {
  return {
    completedProfile: auth.completedProfile,
    email: auth.email
  }
};

const matchDispatchToProps = dispatch => bindActionCreators({userCompletedSignUpRequest, userUploadedImage}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(SignUpSteps);
