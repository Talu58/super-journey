import React, { Component, PropTypes } from 'react';
import './_donor.sass';
import SearchBar from './search-bar/search-bar';
import Matches from './matches/matches';

class Donor extends Component {
  render() {
    const { industries } = this.props;
    return (
      <div className="donor-view-container">
        <div className="matches-view-container">
          <Matches/>
        </div>
        <div className="search-bar-view-container">
          <SearchBar industries={industries}/>
        </div>
      </div>
    );
  }
}

Donor.propTypes = {

};

export default Donor;