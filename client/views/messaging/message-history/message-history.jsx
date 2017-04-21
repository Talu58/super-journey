import React, { Component, PropTypes } from 'react';
import './_message-history.sass';
import MessageHistoryItem from '../../../components/message-history-item/message-history-item';

export default class MessageHistory extends Component {
  constructor(props) {
    super(props);

    this.messageHistoryItemClicked = this.messageHistoryItemClicked.bind(this);
  }

  messageHistoryItemClicked(e) {
    const { userChangedCurrentThread, role } = this.props;
    const threadName = e.target.id ? e.target.id : e.target.parentNode.id;
    userChangedCurrentThread(threadName, role);
  }

  render() {
    const { allMessageThreads, role, currentMessageThreadName, messagesNotification } = this.props;
    return (
      <div className="message-history-container">
         <div  className="messaging-history-header-container">
          <h1 className="messaging-history-header">Message History</h1>
        </div>
        <section className="message-history-list-container">
        { allMessageThreads ? 
          allMessageThreads.map(messageThread => {
            const isActive = messageThread.threadName === currentMessageThreadName ? true: false;
            return (
              <MessageHistoryItem
                key={messageThread['_id'] + Math.floor(Math.random() * 1000)}
                messageThread={messageThread}
                role={role}
                isActive={isActive}
                clickHandler={this.messageHistoryItemClicked}
                messagesNotification={messagesNotification ? messagesNotification[messageThread.threadName] : 0}
              />
            )
          })
          : <p>loading</p>
        }
        </section>
      </div>
    );
  }
}

MessageHistory.propTypes = {
  currentMessageThreadName: PropTypes.string.isRequired,
  allMessageThreads: PropTypes.array.isRequired,
  messagesNotification: PropTypes.object,
  role: PropTypes.object,
  userChangedCurrentThread: PropTypes.func.isRequired,
};
