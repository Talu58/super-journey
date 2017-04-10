import React, { Component, PropTypes } from 'react';
import './_matches.sass';
import Match from '../match/match';

export default class Matches extends Component {
  render() {
    const { matchesResult, isSearching } = this.props;
    let searchMessage = '';
    if (isSearching) {
      searchMessage = 'Here is the result of your search:';
    } else {
      searchMessage = 'We have matched these projects with your preferences:'; 
    }
    return (
      <div>
        <h2>{searchMessage}</h2>
        { matchesResult.length === 0 ?
          <p>We don't have any match for your profile at the moment. Use our side bar to find other projects</p>
          : 
          <section className="matches-container">
            {matchesResult.map(({ title, description }) => {
              return <Match key={title} title={title} description={description} />
            })}
          </section>
        }
      </div>
    );
  }
}
