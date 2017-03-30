import React, { Component } from 'react';
import './_signup-steps.sass';
import Button from '../../components/button/button';
import SignUpStep from '../signup-step/signup-step';
import { Route, Link } from 'react-router-dom';

export default class SignUpSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      role: { Donor: false, 'Non-Profit Organisation': false },
      industry: {Healthcare: false, Tech: false, Climat: false, Inclusion: false, 'Global Change': false}
    }
    this.clickOptionHandler = this.clickOptionHandler.bind(this);
    this.clickPrevHandler = this.clickPrevHandler.bind(this);
    this.clickNextHandler = this.clickNextHandler.bind(this);
  }

  clickOptionHandler(e) {
    console.log('clickOptionHandler');
    if (this.state.step === 1) {
      console.log('clickOptionHandler step1');
      const { role } = this.state;
      const newState = {
        ...role,
        [e.target.name]: !this.state.role[e.target.name],
      };
      this.setState({
        role: newState,
      });
    } else {
      console.log('clickOptionHandler step2');
      const { industry } = this.state;
      const newState = {
        ...industry,
        [e.target.name]: !this.state.industry[e.target.name],
      };
      this.setState({
        industry: newState,
      });
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
      step: step+1
    });
  }

  render() {
    let display = '';
    switch (this.state.step) {
      case 1:
        display = (
          <div>
            <SignUpStep buttons={this.state.role} clickHandler={this.clickOptionHandler}/>
          </div>
        );
        break;
      case 2:
        display = (
          <div>
            <SignUpStep buttons={this.state.industry} clickHandler={this.clickOptionHandler}/>
          </div>
        );
        break;
      default: 
        display = (
          <div />
        );
    }
    return  (
      <div className="signup-steps-container">
        <h1>SignUpSteps</h1>
        {display}
        <div className="signup-steps-button-container">
          {this.state.step === 1 ? <Button disabled={true} styleClassName="button-primary" value="Prev"/>
            : <Button clickHandler={this.clickPrevHandler} value="Prev" styleClassName="button-primary"/>
          }
          {this.state.step !== 2 ? <Button clickHandler={this.clickNextHandler} styleClassName="button-primary" value="Next"/>
            : <Button clickHandler={this.clickSaveHandler} value="Save" styleClassName="button-primary"/>
          }
        </div>
      </div>
    );
  }
}




