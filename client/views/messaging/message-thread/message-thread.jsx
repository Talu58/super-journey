import React, { Component } from 'react';
import './_message-thread.sass';

class MessageThread extends Component {
  render() {
    const { currentMessageThread, currentMessageThreadUserName } = this.props;
    console.log('currentMessageThread', currentMessageThread);
    console.log('currentMessageThreadUserName', currentMessageThreadUserName);

    return (
      <div>
        MessageThread
      </div>
    );
  }
}

export default MessageThread;