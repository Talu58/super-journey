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
        <h1 className="matches-view-header" >{searchMessage}</h1>
        <section className="match-industry-text-container" >
          <p className="match-result-number" >We found {matchesResult.length} results: </p>
          <section className="match-industry-tags-container">
            {!isFiltering ? Object.keys(industriesList).sort().map(industry => {
                if (industriesList[industry] === true) {
                  const industryName = industry.replace(/\s/g, '').toLowerCase();
                  return <span key={industry} className={`match-industry-tags match-industry-tags-${industryName}`}>{industry}</span>
                }
              }) : null}
          </section>
        </section>
        { matchesResult.length === 0 ?
          <p>We don't have any match for your profile at the moment. Use our side bar to find other projects</p>
          : 
          <section className="matches-container" >
            {matchesResult.map(({ title, description, industryNames }) => {
              return (
                <Match
                  industryNames={industryNames}
                  key={title + Math.random() * 1000}
                  title={title}
                  description={description}
                />
              );
            })}
          </section>
        }
      </div>
    );
  }
};

Matches.propTypes = {
  isFiltering: PropTypes.bool.isRequired,
  matchesResult: PropTypes.array.isRequired,
  industriesList: PropTypes.object.isRequired
};
