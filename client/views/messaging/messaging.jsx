import React, { Component, PropTypes } from 'react';
import './_messaging.sass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageThread from './message-thread/message-thread';
import MessageHistory from './message-history/message-history';

class Messaging extends Component {
  render() {
    const { currentMessageThread, currentMessageThreadName, allMessageThreads } = this.props;
    return (
      <div className="message-container" >
        <div className="message-thread-container" >
        <MessageThread 
          currentMessageThread={currentMessageThread}
          currentMessageThreadName={currentMessageThreadName}
        />
        </div>
        <div className="message-history-container" >
          <MessageHistory 
            allMessageThreads={allMessageThreads}
          />
        </div>
      </div>
    );
  }
}

Messaging.propTypes = {
    currentMessageThreadName: PropTypes.string.isRequired,
    currentMessageThread: PropTypes.array.isRequired,
    allMessageThreads: PropTypes.array.isRequired
};

const mapStateToProps = ({ messaging }) => {
  return {
    currentMessageThreadName: messaging.currentMessageThreadName,
    currentMessageThread: messaging.currentMessageThread,
    allMessageThreads: messaging.allMessageThreads
  };
}

const matchDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Messaging);

