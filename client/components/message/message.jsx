import React, { Component } from 'react';
import './_message.sass';

export default class Message extends Component {
  render() {
    const { message, curentUserFirstName } = this.props;
    let messageClass = 'message';

    if (message.from === curentUserFirstName) {
      messageClass += ' message-from';
    } else {
      messageClass += ' message-to';
    }

    return (
      <div className="message-container">
        <p  className={messageClass}>{message.message}</p>
      </div>
    );
  }
}

