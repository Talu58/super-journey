import React, { Component, PropTypes } from 'react';
import './_message-history-item.sass';

export default class MessageHistoryItem extends Component {
  render() {
    const { messageThread, role, isActive, clickHandler, messagesNotification } = this.props;
    const UserName = role.Donor ? messageThread.nameUserOne : messageThread.nameUserTwo;
    const lastMessage = messageThread.messages[messageThread.messages.length - 1].message;
    let messageHistoryItemContainerClass = 'message-history-item-container';

    if (isActive) {
      messageHistoryItemContainerClass += ' message-history-item-container-active'
    }

    return (
      <div  className={messageHistoryItemContainerClass} onClick={clickHandler} id={messageThread.threadName} >
        <div className="message-history-item-text-container" id={messageThread.threadName}>
          <h1 className="message-history-item-header" >{UserName}</h1>
          <p  className="message-history-item-text" >{lastMessage}</p>
        </div>
        <div className="message-history-item-notification-container" id={messageThread.threadName}>
          {messagesNotification === 0 ? 
            <p></p> 
            : <p className="message-history-notification">{messagesNotification}</p>
          }
        </div>
      </div>
    );
  }
};

MessageHistoryItem.propTypes = {
  role: PropTypes.object,
  messagesNotification: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
  messageThread: PropTypes.object.isRequired
};
