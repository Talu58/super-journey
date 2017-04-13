import React, { Component, PropTypes } from 'react';
import './_profile.sass';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    const { role, email, firstname, lastname } = this.props;
    return (
      <div>
        <p>Firstname: {firstname}</p>
        <p>Lastname: {lastname}</p>
        <p>Email: {email}</p>
      </div>
    );
  }
};

Profile.propTypes = {
  role: PropTypes.object.isRequired,
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

export default connect(mapStateToProps)(Profile);
