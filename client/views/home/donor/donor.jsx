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

};

export default Donor;