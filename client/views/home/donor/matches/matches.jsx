import React, { Component, PropTypes } from 'react';
import './_matches.sass';
import Match from '../match/match';

export default class Matches extends Component {
  render() {
    const { matchesResult, isFiltering, industriesList, userEmail, firstMessageSent, userFirstname } = this.props;
    let searchMessage = '';
    if (isFiltering) {
      searchMessage = 'Here is the result of your search:';
    } else {
      searchMessage = 'We have matched these organizations with your preferences:'; 
    }
    return (
      <div>
        <h1 className="matches-view-header" >{searchMessage}</h1>
        <section className="match-industry-text-container" >
          <p className="match-result-number" >We found {matchesResult.length} results: </p>
          <section className="match-industry-tags-container">
            {!isFiltering ? Object.keys(industriesList).sort().map(industryName => {
                if (industriesList[industryName] === true) {
                  const industryNameFormatted = industryName.replace(/\s/g, '').toLowerCase();
                  return <span key={industryName} className={`match-industry-tags match-industry-tags-${industryNameFormatted}`}>{industryName}</span>
                }
              }) : null}
          </section>
        </section>
        { matchesResult.length === 0 ?
          <p>We don't have any match for your profile at the moment. Use our side bar to find other organizations</p>
          : 
          <section className="matches-container" >
            {matchesResult.map(({ name, description, industryNames, firstname, email }) => {
              return (
                <Match
                  industryNames={industryNames}
                  key={name + Math.random() * 1000}
                  name={name}
                  description={description}
                  matchFirstname={firstname}
                  matchEmail={email}
                  userEmail={userEmail}
                  firstMessageSent={firstMessageSent}
                  userFirstname={userFirstname}
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
  industriesList: PropTypes.object.isRequired,
  userEmail: PropTypes.string.isRequired,
  firstMessageSent: PropTypes.func.isRequired
};
