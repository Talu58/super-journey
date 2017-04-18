import React, { Component } from 'react';
import './_message.sass';

export default class Message extends Component {
  render() {
    const { message, curentUserFirstName } = this.props;
    let messageContainerClass = 'message-container';
    let messageSender = message.from === curentUserFirstName ? 'You' : message.from;

    if (message.from === curentUserFirstName) {
      messageContainerClass += '-from'
    } else {
      messageContainerClass += '-to'
    }

    return (
      <div className={messageContainerClass}>
        <h2>{messageSender}</h2>
        <p>{message.message}</p>
      </div>
    );
  }
}

