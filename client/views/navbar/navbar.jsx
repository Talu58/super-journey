import React, { Component } from 'react';
import Button from '../../components/button/button';
import LoginForm from '../login-form/login-form';
import { Link } from 'react-router-dom';
import './_navbar.sass';

export default class NavBar extends Component {
  render() {
    const { isAuth, completedProfile } = this.props;
    return (
      <header className="navbar-container">
        <div className="logo-container"> 
          <Link to="/">
            <img src="https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjMv7TjlPfSAhVkyFQKHZmTD08QjRwIBw&url=http%3A%2F%2Fnews.carrierenterprise.com%2Fmotivation-for-a-monday%2F&bvm=bv.150729734,d.cGw&psig=AFQjCNHZbE-xH6DF9mkeS7Kim_bVtV0F8A&ust=1490720468903502"/>
          </Link>
        </div>
        <div className="navbar-actions-container">
          {isAuth && completedProfile ? 
            <Link to="/profile">
              <Button value="Profile" />
            </Link>
            : null
          }
          {isAuth ? 
            <Button value="Sign Out" />
            : <LoginForm/>
          }
        </div>
      </header>
    );
  }
}
