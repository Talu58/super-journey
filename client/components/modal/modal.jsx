import React, { Component, PropTypes } from 'react';
import './_modal.sass';
import Button from '../button/button';

export default class Modal extends Component {
  render() {
    const { isOpen, closeModalHandler, ChildComponent, childComponentsProps } = this.props;
    return isOpen ? 
      <div className="modal-window-container">
        <div className="modal-container">
          <Button 
            clickHandler={closeModalHandler}
            value="X"
            containerStyleClassName="modal-close-button-container"
            styleClassName="modal-close-button"
          />
          <ChildComponent props={childComponentsProps}/>
        </div>
      </div>
      : null
  }
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModalHandler: PropTypes.func.isRequired,
  childComponentsProps: PropTypes.object.isRequired,
};

