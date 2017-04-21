import React, { Component } from 'react';
import './_landing-page.sass';
import SignUpForm from './signupform/signupform';
import TryDemo from './try-demo/try-demo';

const LandingPage = () => (
  <div className="landing-page-view-container" >
    <div className="landing-page-header-container">
      <h1 className="landing-page-header">Welcome to Ignite Impact!</h1>
      <p className="landing-page-header-description">We match donors and non profit organizations to facilitate the discussions and boost the impacts</p>
    </div>
    <section className="landing-page-content-container" >
      <TryDemo/>
      <SignUpForm/>
    </section>
  </div>
);

export default LandingPage;
