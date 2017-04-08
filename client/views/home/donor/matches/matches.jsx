import React, { Component, PropTypes } from 'react';

export default class Matches extends Component {
  render() {
    const { matchesResult } = this.props;
    return (
      <div>
        Matches:
        {matchesResult.map(({ title, description }) => {
          return <div key={title}>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
        })}
      </div>
    );
  }
}
