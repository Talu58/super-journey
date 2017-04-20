import React, { Component, PropTypes } from 'react';
import './_profile.sass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Button from '../../components/button/button';
import { getUserInformation } from '../../actions/auth/authActions';
import jwt from 'jsonwebtoken';

class Profile extends Component {

  componentWillMount() {
    const { getUserInformation } = this.props;
    const { email } = jwt.decode(localStorage.jwtToken);
    getUserInformation(email);
  }

  render() {
    const { role, email, firstname, lastname } = this.props;
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
          </section>
          <Button
            value="Change Password"
            styleClassName="profile-edit-button"
          />
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
