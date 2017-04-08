import React, { Component } from 'react';
import './_match.sass';

export default class Match extends Component {
  render() {
    const { title, description } = this.props;
    return (
      <div className="match-container">
        <h3 className="match-title">{title}</h3>
        <p className="match-description">{description}</p>
      </div>
    );
  }
}
