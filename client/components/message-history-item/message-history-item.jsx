import React, { Component } from 'react';
import './_message-history-item.sass';

export default class MessageHistoryItem extends Component {
  render() {
    const { messageThread, role } = this.props;
    const UserName = role.Donor ? messageThread.nameUserOne : messageThread.nameUserTwo;
    const lastMessage = messageThread.messages[messageThread.messages.length - 1].message;
    console.log('messageThread', messageThread);
    return (
      <div>
        <h1>{UserName}</h1>
        <p>{lastMessage}</p>
      </div>
    );
  }
}

