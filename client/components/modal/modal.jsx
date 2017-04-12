import React, { Component, PropTypes } from 'react';
import './_modal.sass';
import Button from '../button/button';

export default class Modal extends Component {
  render() {
    const { isOpen, closeModalHandler, title, description } = this.props;
    return isOpen ? 
      <div className="modal-window-container">
        <div className="modal-container">
          <Button 
            clickHandler={closeModalHandler}
            value="X"
          />
          <h1>{title}</h1>
          <p>{description}</p>
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

