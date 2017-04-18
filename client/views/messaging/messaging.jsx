import React, { Component, PropTypes } from 'react';
import './_messaging.sass';
import MessageThread from './message-thread/message-thread';
import MessageHistory from './message-history/message-history';

class Messaging extends Component {
  render() {
    return (
      <div className="message-container" >
        <div className="message-thread-container" >
        <MessageThread />
        </div>
        <div className="message-history-container" >
          <MessageHistory />
        </div>
      </div>
    );
  }
}

Messaging.propTypes = {

};

export default Messaging;