import React, { Component, PropTypes } from 'react';
import './_donor.sass';
import SearchBar from './search-bar/search-bar';
import Matches from './matches/matches';

class Donor extends Component {
  render() {
    const { industries, matchesResult, searchCheckboxClicked, isFiltering, searchRequest, fetchAllProjects, fetchUserMatches, allProjectsResults, userMatchesDisplayed, industriesList } = this.props;
    return (
      <div className="donor-view-container">
        <div className="matches-view-container">
          <Matches
            matchesResult={matchesResult}
            isFiltering={isFiltering}
            industriesList={industriesList}
          />
        </div>
        <div className="search-bar-view-container">
          <SearchBar
            fetchAllProjects={fetchAllProjects}
            fetchUserMatches={fetchUserMatches}
            industries={industries}
            searchCheckboxClicked={searchCheckboxClicked}
            searchRequest={searchRequest}
            allProjectsResults={allProjectsResults}
            userMatchesDisplayed={userMatchesDisplayed}
          />
        </div>
      </div>
    );
  }
}

Donor.propTypes = {
  fetchAllProjects: PropTypes.func.isRequired,
  fetchUserMatches: PropTypes.func.isRequired,
  industries: PropTypes.array.isRequired,
  searchCheckboxClicked: PropTypes.func.isRequired,
  searchRequest: PropTypes.func.isRequired,
  allProjectsResults: PropTypes.array.isRequired,
  userMatchesDisplayed: PropTypes.bool.isRequired,
  isFiltering: PropTypes.bool.isRequired,
  matchesResult: PropTypes.array.isRequired,
  industriesList: PropTypes.object.isRequired
};

export default Donor;