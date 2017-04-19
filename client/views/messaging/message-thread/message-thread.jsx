import React, { Component } from 'react';
import './_message-thread.sass';
import Message from '../../../components/message/message';
import Button from '../../../components/button/button';
import InputField from '../../../components/input-field/input-field';

export default class MessageThread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageInputFieldValue: ''
    }
    this.newMessageInputFieldChange = this.newMessageInputFieldChange.bind(this);
    this.sendNewMessageClicked=this.sendNewMessageClicked.bind(this);
  }

  newMessageInputFieldChange(e) {
    let newMessageInputFieldValue = e.target.value;
    this.setState({
      messageInputFieldValue: newMessageInputFieldValue
    });
  }

  sendNewMessageClicked() {
    const { newMessageSent, currentMessageThreadName, currentMessageThreadUserName, curentUserFirstName } = this.props;
    if (this.state.messageInputFieldValue !== '') {
      const newMessage = {
        message: this.state.messageInputFieldValue,
        recipient: currentMessageThreadUserName,
        sender: curentUserFirstName,
        threadName:currentMessageThreadName
      };
      newMessageSent(newMessage);
      this.setState({
        messageInputFieldValue: ''
      });
    }
  }

  render() {
    const { currentMessageThread, currentMessageThreadUserName, curentUserFirstName } = this.props;

    return (
      <div>
        <h1 className="messaging-thread-header">Discussion with {currentMessageThreadUserName}</h1>
        {currentMessageThread.map(message => {
          return (
            <Message
              key={message.message}
              message={message}
              curentUserFirstName={curentUserFirstName}
            />
          );
        })}
        <div className="messaging-thread-new-message-container">
          <InputField
            placeholderText="Enter your message here"
            changeHandler={this.newMessageInputFieldChange}
            value={this.state.messageInputFieldValue}
            styleClassName="messaging-thread-new-message-input-field"
            containerStyleClassName="messaging-thread-new-message-input-field-container"
          />
          <Button
            value="Send"
            styleClassName="button-primary"
            clickHandler={this.sendNewMessageClicked}
            containerStyleClassName="messaging-thread-new-message-button-container"
          />
        </div>
      </div>
    );
  }
};

