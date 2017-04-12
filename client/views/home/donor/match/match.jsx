import React, { Component, PropTypes } from 'react';
import './_match.sass';
import Button from '../../../../components/button/button';

export default class Match extends Component {
  render() {
    const { title, description, industryNames } = this.props;
    const industryNamesKeys = Object.keys(industryNames);
    return (
      <div className="match-container">
        <section className="industry-name-bullets-container" >
          {industryNamesKeys.map(industryName => {
            const industryNameFormatted = industryName.replace(/\s/g, '').toLowerCase();
            return <p key={industryName} className={`industry-name-bullet industry-name-bullet-${industryNameFormatted}`}></p>
          })}
        </section>
        <h3 className="match-title">{title}</h3>
        <hr className="match-separator" />
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
  description: PropTypes.string.isRequired,
  industryNames: PropTypes.object.isRequired
};
