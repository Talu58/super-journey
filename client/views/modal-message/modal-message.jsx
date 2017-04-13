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
        subject: '',
        message: '',
      },
      fieldIncomplete: {
        subject: false,
        message: false,
      }
    }
    this.inputFieldChangeHandler = this.inputFieldChangeHandler.bind(this);
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
    for (let key in this.state.inputFieldsValues) {
      if (this.state.inputFieldsValues[key] === '') {
        return false;
      }
    }
    return true;
  }

  sendButtonClicked(e) {
    e.preventDefault();
    const isValid = this.isFormValid();
    if (isValid) {
      const { props: { closeModal, matchEmail, userEmail } } = this.props;
      const newMessage = {
        ...this.state.inputFieldsValues,
        recipient: matchEmail,
        sender: userEmail
      };
      console.log('newMessage', newMessage);
      closeModal();
    } else {
      let newFieldIncomplete = this.state.fieldIncomplete;
      for (let key in this.state.inputFieldsValues) {
        if (this.state.inputFieldsValues[key] === '') {
          newFieldIncomplete[key] = true;
        } else {
          newFieldIncomplete[key] = false;
        }
      }
      this.setState({
        fieldIncomplete: newFieldIncomplete
      });
    }
  }

  render() {
    const { props: { matchFirstname } } = this.props
    return (
      <div>
          <h1 className="message-modal-title">Send a message to {matchFirstname}</h1>
          <form className="message-modal-form">
            <InputField
              placeholderText="Subject"
              containerStyleClassName="message-modal-input-field-container"
              styleClassName="message-modal-input-field"
              changeHandler={this.inputFieldChangeHandler}
              value={this.state.inputFieldsValues.subject}
              name="subject"
              type="text"
            />
            {this.state.fieldIncomplete.subject ?
              <span className="message-error-message">* Subject field required</span>
              : null
            }
            <TextAreaField
              placeholderText="Enter your message here..."
              containerStyleClassName="message-modal-text-area-container"
              styleClassName="message-modal-text-area"
              rows={17}
              changeHandler={this.inputFieldChangeHandler}
              value={this.state.inputFieldsValues.message}
              name="message"
            />
            {this.state.fieldIncomplete.message ?
              <span className="message-error-message">* Message field required</span>
              : null
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
