import React, { Component, PropTypes } from 'react';
import './_non-profit.sass';
import Button from '../../../components/button/button';


class NonProfit extends Component {
  render() {
    const { organization } = this.props;
    return (
      <div className="organization-profile-view">
        <div className="organization-profile-container">
          <h1 className="organization-profile-information-header">Your Organization's information:</h1>
          <section className="organization-profile-information-container">
            <p>Name:</p>
            <p className="organization-details">{organization.name}</p>
            <p>Description:</p>
            <p className="organization-details">{organization.description}</p>
          </section>
          <Button
            value="Edit"
            styleClassName="organization-profile-edit-button"
          />
        </div>
      </div>
    );
  }
}

NonProfit.propTypes = {

};

export default NonProfit;