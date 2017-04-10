import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import './_signup-steps.sass';
import { userCompletedSignUpRequest } from '../../actions/auth/authActions';
import Button from '../../components/button/button';
import SignUpStep from '../signup-step/signup-step';
import ProjectForm from '../project-form/project-form';

class SignUpSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      role: { Donor: false, 'Non-Profit Organisation': false },
      industry: {Healthcare: false, Tech: false, Climat: false, Inclusion: false, 'Global Change': false},
      project: {title: '', description: ''},
      hasRole: false,
      hasCompletedStep: false
    }
    this.clickOptionHandler = this.clickOptionHandler.bind(this);
    this.fieldChangeHandler = this.fieldChangeHandler.bind(this);
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
    const { project } = this.state;
    const newState = {
      ...project,
      [e.target.name]: e.target.value
    }
    if (newState.title !== '' && newState.description !== '') {
      this.setState({
        project: newState,
        hasCompletedStep: true
      })
    } else {
      this.setState({
        project: newState,
        hasCompletedStep: false
      })
    }
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
    const { userCompletedSignUpRequest, email } = this.props;
    const { role, industry, project } = this.state;
    const newUser = {
      role,
      industry,
      project,
      email
    }
    userCompletedSignUpRequest(newUser);
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
            />
          </div>
        );
        break;
      case 3:
        display = (
          <div>
            <ProjectForm 
              changeHandler={this.fieldChangeHandler}
              values={this.state.project}
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
          <h1>SignUpSteps</h1>
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
}

SignUpSteps.propTypes = {
  userCompletedSignUpRequest: React.PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => {
  return {
    completedProfile: auth.completedProfile,
    email: auth.email
  }
};

const matchDispatchToProps = dispatch => bindActionCreators({userCompletedSignUpRequest}, dispatch)

export default connect(mapStateToProps, matchDispatchToProps)(SignUpSteps);
