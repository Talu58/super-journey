import React, { Component } from 'react';
import './_message.sass';

export default class Message extends Component {
  render() {
    const { message, curentUserFirstName } = this.props;
    let messageSender = message.from === curentUserFirstName ? 'You' : message.from;
    let messageClass = 'message';
    let messageSenderClass = 'message-sender';

    if (message.from === curentUserFirstName) {
      messageClass += ' message-from';
      messageSenderClass += ' message-sender-from';
    } else {
      messageClass += ' message-to';
      messageSenderClass += ' message-sender-to';
    }

    return (
      <div className="message-container">
        <h2 className={messageSenderClass}>{messageSender}</h2>
        <p  className={messageClass}>{message.message}</p>
      </div>
    );
  }
}

