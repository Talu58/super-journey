import React, { Component, PropTypes } from 'react';
import './_donor.sass';
import SearchBar from './search-bar/search-bar';
import Matches from './matches/matches';

class Donor extends Component {
  render() {
    const { industries, matchesResult, searchCheckboxClicked, isSearching, searchRequest } = this.props;
    return (
      <div className="donor-view-container">
        <div className="matches-view-container">
          <Matches matchesResult={matchesResult} isSearching={isSearching} />
        </div>
        <div className="search-bar-view-container">
          <SearchBar
            industries={industries}
            searchCheckboxClicked={searchCheckboxClicked}
            searchRequest={searchRequest}
          />
        </div>
      </div>
    );
  }
}

Donor.propTypes = {

};

export default Donor;