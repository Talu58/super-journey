import React, { Component } from 'react';
import './_message-history.sass';
import MessageHistoryItem from '../../../components/message-history-item/message-history-item';

class MessageHistory extends Component {
  render() {
    const { allMessageThreads, role, currentMessageThreadName } = this.props;
    return (
      <div className="message-history-container">
        { allMessageThreads ? 
          allMessageThreads.map(messageThread => {
            const isActive = messageThread.threadName === currentMessageThreadName ? true: false;
            return (
              <MessageHistoryItem
                key={messageThread['_id']}
                messageThread={messageThread}
                role={role}
                isActive={isActive}
              />
            )
          })
          : <p>loading</p>
        }
      </div>
    );
  }
}

export default MessageHistory;