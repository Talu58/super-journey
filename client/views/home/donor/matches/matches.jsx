import React, { Component, PropTypes } from 'react';
import './_matches.sass';
import Match from '../match/match';

export default class Matches extends Component {
  render() {
    const { matchesResult, isFiltering, industriesList } = this.props;
    let searchMessage = '';
    if (isFiltering) {
      searchMessage = 'Here is the result of your search:';
    } else {
      searchMessage = 'We have matched these projects with your preferences:'; 
    }
    return (
      <div>
        <h2>{searchMessage}</h2>
        {!isFiltering ? Object.keys(industriesList).sort().map(industry => {
            if (industriesList[industry] === true) {
              return <span key={industry} className="match-industry-tags">{industry}</span>
            }
          }) : null}
        { matchesResult.length === 0 ?
          <p>We don't have any match for your profile at the moment. Use our side bar to find other projects</p>
          : 
          <section className="matches-container">
            {matchesResult.map(({ title, description }) => {
              return <Match key={title + Math.random() * 1000} title={title} description={description} />
            })}
          </section>
        }
      </div>
    );
  }
}
