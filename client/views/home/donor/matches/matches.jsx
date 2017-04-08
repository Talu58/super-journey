import React, { Component, PropTypes } from 'react';
import './_matches.sass';
import Match from '../match/match';

export default class Matches extends Component {
  render() {
    const { matchesResult } = this.props;
    return (
      <div>
        <h2>Matches:</h2>
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
