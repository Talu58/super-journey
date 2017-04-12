import React, { Component, PropTypes } from 'react';
import './_modal.sass';
import Button from '../button/button';

export default class Modal extends Component {
  render() {
    const { isOpen, closeModalHandler, title, description, industryNames } = this.props;
    return isOpen ? 
      <div className="modal-window-container">
        <div className="modal-container">
          <Button 
            clickHandler={closeModalHandler}
            value="X"
            containerStyleClassName="modal-close-button-container"
            styleClassName="modal-close-button"
          />
          <h1>{title}</h1>
          {industryNames.map(industryName => {
            const industryNameFormatted = industryName.replace(/\s/g, '').toLowerCase();
            return <span key={industryName} className={`match-industry-tags match-industry-tags-${industryNameFormatted}`}>{industryName}</span>
          })}
          <hr className="modal-separator" />
          <p className="modal-description">{description}</p>
        </div>
      </div>
      : null
  }
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModalHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

