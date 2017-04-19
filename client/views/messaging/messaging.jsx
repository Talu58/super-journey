import React, { Component, PropTypes } from 'react';
import './_messaging.sass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageThread from './message-thread/message-thread';
import MessageHistory from './message-history/message-history';
import { getUserInformation } from '../../actions/auth/authActions';
import { newMessageSent } from '../../actions/messaging/messagingActions';
import jwt from 'jsonwebtoken';

class Messaging extends Component {

  componentWillMount() {
    const { getUserInformation } = this.props;
    const { email } = jwt.decode(localStorage.jwtToken);
    getUserInformation(email, 'messaging');
  }

  render() {
    const { currentMessageThread, currentMessageThreadUserName, currentMessageThreadName, allMessageThreads, firstname, newMessageSent, role } = this.props;
    return (
      <div className="messaging-container" >
        <div className="messaging-thread-container" >
        <MessageThread 
          currentMessageThread={currentMessageThread}
          currentMessageThreadUserName={currentMessageThreadUserName}
          currentMessageThreadName={currentMessageThreadName}
          curentUserFirstName={firstname}
          newMessageSent={newMessageSent}
        />
        </div>
        <div className="messaging-history-container" >
          <MessageHistory 
            allMessageThreads={allMessageThreads}
            role={role}
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
    newMessageSent: PropTypes.func.isRequired,
    getUserInformation: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, messaging }) => {
  return {
    currentMessageThreadUserName: messaging.currentMessageThreadUserName,
    currentMessageThreadName: messaging.currentMessageThreadName,
    currentMessageThread: messaging.currentMessageThread,
    allMessageThreads: messaging.allMessageThreads,
    firstname: auth.firstname,
    role: auth.role
  };
}

const matchDispatchToProps = dispatch => bindActionCreators({newMessageSent, getUserInformation}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Messaging);

