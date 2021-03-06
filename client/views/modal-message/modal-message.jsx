import React, { Component, PropTypes } from 'react';
import './_modal-message.sass';
import Button from '../../components/button/button';
import InputField from '../../components/input-field/input-field';
import TextAreaField from '../../components/text-area-field/text-area-field';

export default class ModalMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFieldsValues: {
        message: '',
      },
      errors: {
        message: '',
      }
    }
    this.inputFieldChangeHandler = this.inputFieldChangeHandler.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.sendButtonClicked = this.sendButtonClicked.bind(this);
  }

  inputFieldChangeHandler(e) {
    let newInputFieldValue = e.target.value;
    let newInputFieldsValues = {
      ...this.state.inputFieldsValues
    };
    newInputFieldsValues[e.target.name] = newInputFieldValue;
    this.setState({
      inputFieldsValues: newInputFieldsValues
    });  
  }

  isFormValid() {
    let isValid = true;
    for (let key in this.state.inputFieldsValues) {
      const newErrors = this.state.errors;
      let errorMessage;
      if (this.state.inputFieldsValues[key] === '') {
        errorMessage = `* ${key} field is required`;
        isValid = false;
      } else {
        errorMessage = '';
      }
      newErrors[key] = errorMessage;
      this.setState({
        error: newErrors
      });
    }
    return isValid;
  }

  sendButtonClicked(e) {
    e.preventDefault();
    const isValid = this.isFormValid();
    if (isValid) {
      const { props: { closeModal, matchEmail, userEmail, firstMessageSent, matchFirstname, userFirstname } } = this.props;
      const newMessage = {
        ...this.state.inputFieldsValues,
        to: matchFirstname,
        recipientEmail: matchEmail,
        from: userFirstname,
        senderEmail: userEmail
      };
      firstMessageSent(newMessage);
      closeModal();
    } 
  }

  render() {
    const { props: { matchFirstname } } = this.props
    return (
      <div>
          <h1 className="message-modal-name">Send a message to {matchFirstname}</h1>
          <form className="message-modal-form">
            <TextAreaField
              placeholderText="Enter your message here..."
              containerStyleClassName="message-modal-text-area-container"
              styleClassName="message-modal-text-area"
              rows={17}
              changeHandler={this.inputFieldChangeHandler}
              value={this.state.inputFieldsValues.message}
              name="message"
            />
            {this.state.errors.message !== '' ?
              <p className="message-error-message">{this.state.errors.message}</p>
              : <p className="message-error-message"></p>
            }
            <Button
              value="Send"
              styleClassName="button-primary"
              clickHandler={this.sendButtonClicked}
            />
          </form>
      </div>
    );
  }
};

ModalMessage.propTypes = {
  props: PropTypes.object.isRequired
};
