import React, { Component, PropTypes } from 'react';
import './_messaging.sass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageThread from './message-thread/message-thread';
import MessageHistory from './message-history/message-history';
import { newMessageSent } from '../../actions/messaging/messagingActions';

class Messaging extends Component {

  render() {
    const { currentMessageThread, currentMessageThreadUserName, currentMessageThreadName, allMessageThreads, firstname, newMessageSent } = this.props;
    return (
      <div className="message-container" >
        <div className="message-thread-container" >
        <MessageThread 
          currentMessageThread={currentMessageThread}
          currentMessageThreadUserName={currentMessageThreadUserName}
          currentMessageThreadName={currentMessageThreadName}
          curentUserFirstName={firstname}
          newMessageSent={newMessageSent}
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
    currentMessageThreadUserName: PropTypes.string.isRequired,
    currentMessageThreadName: PropTypes.string.isRequired,
    currentMessageThread: PropTypes.array.isRequired,
    allMessageThreads: PropTypes.array.isRequired,
    firstname: PropTypes.string.isRequired,
    newMessageSent: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, messaging }) => {
  return {
    currentMessageThreadUserName: messaging.currentMessageThreadUserName,
    currentMessageThreadName: messaging.currentMessageThreadName,
    currentMessageThread: messaging.currentMessageThread,
    allMessageThreads: messaging.allMessageThreads,
    firstname: auth.firstname
  };
}

const matchDispatchToProps = dispatch => bindActionCreators({newMessageSent}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Messaging);

