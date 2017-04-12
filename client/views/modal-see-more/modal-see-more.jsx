import React, { Component, PropTypes } from 'react';
import './_modal-see-more.sass';

export default class ModalSeeMore extends Component {
  render() {
    const { props: { title, description, industryNames } } = this.props;
    return (
      <div>
          <h1 className="see-more-modal-title">{title}</h1>
          {industryNames.map(industryName => {
            const industryNameFormatted = industryName.replace(/\s/g, '').toLowerCase();
            return <span key={industryName} className={`match-industry-tags match-industry-tags-${industryNameFormatted}`}>{industryName}</span>
          })}
          <hr className="see-more-modal-separator" />
          <p className="see-more-modal-description">{description}</p>
      </div>
    );
  }
};

ModalSeeMore.propTypes = {
  props: PropTypes.object.isRequired
};
