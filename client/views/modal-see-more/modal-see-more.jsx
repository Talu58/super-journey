import React, { Component, PropTypes } from 'react';
import './_modal-see-more.sass';

class ModalSeeMore extends Component {
  render() {
    const { props: { title, description, industryNames } } = this.props;
    return (
      <div>
          <h1>{title}</h1>
          {industryNames.map(industryName => {
            const industryNameFormatted = industryName.replace(/\s/g, '').toLowerCase();
            return <span key={industryName} className={`match-industry-tags match-industry-tags-${industryNameFormatted}`}>{industryName}</span>
          })}
          <hr className="modal-separator" />
          <p className="modal-description">{description}</p>
      </div>
    );
  }
}

ModalSeeMore.propTypes = {

};

export default ModalSeeMore;