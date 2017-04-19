import React, { Component } from 'react';
import './_message-history.sass';
import MessageHistoryItem from '../../../components/message-history-item/message-history-item';

class MessageHistory extends Component {
  render() {
    const { allMessageThreads, role } = this.props;
    console.log('allMessageThreads', allMessageThreads);
    return (
      <div className="message-history-container">
        { allMessageThreads ? 
          allMessageThreads.map(messageThread => {
            return (
              <MessageHistoryItem
                key={messageThread['_id']}
                messageThread={messageThread}
                role={role}
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