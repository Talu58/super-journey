import React, { Component, PropTypes } from 'react';
import './_donor.sass';
import SearchBar from './search-bar/search-bar';
import Matches from './matches/matches';

export default class Donor extends Component {
  render() {
    const { 
      industries,
      userFirstname,
      userEmail,
      matchesResult,
      searchCheckboxClicked,
      isFiltering,
      searchRequest,
      fetchAllOrganizations,
      fetchUserMatches,
      allOrganizationsResults,
      userMatchesDisplayed,
      industriesList,
      firstMessageSent
    } = this.props;
    return (
      <div className="donor-view-container">
        <div className="matches-view-container">
          <Matches
            userFirstname={userFirstname}
            matchesResult={matchesResult}
            isFiltering={isFiltering}
            industriesList={industriesList}
            userEmail={userEmail}
            firstMessageSent={firstMessageSent}
          />
        </div>
        <div className="search-bar-view-container">
          <SearchBar
            userFirstname={userFirstname}
            fetchAllOrganizations={fetchAllOrganizations}
            fetchUserMatches={fetchUserMatches}
            industries={industries}
            searchCheckboxClicked={searchCheckboxClicked}
            searchRequest={searchRequest}
            allOrganizationsResults={allOrganizationsResults}
            userMatchesDisplayed={userMatchesDisplayed}
          />
        </div>
      </div>
    );
  }
}

Donor.propTypes = {
  fetchAllOrganizations: PropTypes.func.isRequired,
  userFirstname: PropTypes.string,
  userEmail: PropTypes.string,
  fetchUserMatches: PropTypes.func.isRequired,
  industries: PropTypes.array.isRequired,
  searchCheckboxClicked: PropTypes.func.isRequired,
  searchRequest: PropTypes.func.isRequired,
  allOrganizationsResults: PropTypes.array.isRequired,
  userMatchesDisplayed: PropTypes.bool.isRequired,
  isFiltering: PropTypes.bool.isRequired,
  matchesResult: PropTypes.array.isRequired,
  industriesList: PropTypes.object.isRequired,
  firstMessageSent: PropTypes.func.isRequired
};

