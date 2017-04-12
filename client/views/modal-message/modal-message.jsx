import React, { Component, PropTypes } from 'react';
import './_modal-message.sass';
import Button from '../../components/button/button';
import InputField from '../../components/input-field/input-field';
import TextAreaField from '../../components/text-area-field/text-area-field';

export default class ModalMessage extends Component {
  render() {
    return (
      <div>
          <h1 className="message-modal-title">Send a message to John</h1>
          <hr className="message-modal-separator" />
          <form className="message-modal-form">
            <InputField
              placeholderText="Subject"
              containerStyleClassName="message-modal-input-field-container"
              styleClassName="message-modal-input-field"
            />
            <TextAreaField
              placeholderText="Enter your message here..."
              containerStyleClassName="message-modal-text-area-container"
              styleClassName="message-modal-text-area"
              rows={15}
            />
            <Button
              value="Send"
              styleClassName="button-primary"
            />
          </form>
      </div>
    );
  }
};

ModalMessage.propTypes = {

};
