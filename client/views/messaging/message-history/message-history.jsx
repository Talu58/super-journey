import React, { Component } from 'react';
import './_message-history.sass';
import MessageHistoryItem from '../../../components/message-history-item/message-history-item';

class MessageHistory extends Component {
  constructor(props) {
    super(props);

    this.messageHistoryItemClicked = this.messageHistoryItemClicked.bind(this);
  }

  messageHistoryItemClicked(e) {
    const { userChangedCurrentThread } = this.props;
    const threadName = e.target.id ? e.target.id : e.target.parentNode.id;
    userChangedCurrentThread(threadName);
  }

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
                clickHandler={this.messageHistoryItemClicked}
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