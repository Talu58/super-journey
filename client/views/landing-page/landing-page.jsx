import React, { Component } from 'react';
import './_landing-page.sass';
import SignUpForm from '../signupform/signupform';
import TryDemo from '../try-demo/try-demo';

const LandingPage = () => (
  <div className="landing-page-container" >
    <TryDemo/>
    <SignUpForm/>
  </div>
);

export default LandingPage;
