import React, { Component, PropTypes } from 'react';
import './_match.sass';
import Button from '../../../../components/button/button';

export default class Match extends Component {
  render() {
    const { title, description } = this.props;
    return (
      <div className="match-container">
        <h3 className="match-title">{title}</h3>
        <p className="match-description">{description}</p>
        <section className="match-action-container">
          <Button
            value="See More"
            styleClassName="button-primary"
          />
          <Button
            value="Contact"
            styleClassName="button-primary"
          />
        </section>
      </div>
    );
  }
};

Match.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
