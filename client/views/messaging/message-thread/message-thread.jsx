import React, { Component } from 'react';
import './_message-thread.sass';
import Message from '../../../components/message/message';
import Button from '../../../components/button/button';
import InputField from '../../../components/input-field/input-field';

class MessageThread extends Component {
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
    if (this.state.messageInputFieldValue !== '') {
      console.log('send message', this.state.messageInputFieldValue);
      this.setState({
        messageInputFieldValue: ''
      });
    }
  }

  render() {
    const { currentMessageThread, currentMessageThreadUserName, curentUserFirstName } = this.props;

    return (
      <div>
        <h1>To: {currentMessageThreadUserName}</h1>
        {currentMessageThread.map(message => {
          return (
            <Message
              key={message.message}
              message={message}
              curentUserFirstName={curentUserFirstName}
            />
          );
        })}
        <div>
          <InputField
            placeholderText="Enter your message here"
            changeHandler={this.newMessageInputFieldChange}
            value={this.state.messageInputFieldValue}
          />
          <Button
            value="Send"
            styleClassName="button-primary"
            clickHandler={this.sendNewMessageClicked}
          />
        </div>
      </div>
    );
  }
}

export default MessageThread;