import React, { Component } from 'react';
import './_message-thread.sass';
import Message from '../../../components/message/message';

class MessageThread extends Component {
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
      </div>
    );
  }
}

export default MessageThread;