import React, { Component, PropTypes } from 'react';
import './_messaging.sass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageThread from './message-thread/message-thread';
import MessageHistory from './message-history/message-history';
import { getUserInformation } from '../../actions/auth/authActions';
import { newMessageSent, userChangedCurrentThread, userReceivedANewMessage } from '../../actions/messaging/messagingActions';
import jwt from 'jsonwebtoken';

class Messaging extends Component {

  componentWillMount() {
    const { getUserInformation } = this.props;
    const { email } = jwt.decode(localStorage.jwtToken);
    getUserInformation(email, 'messaging');
  }

  render() {
    const {
      currentMessageThread,
      currentMessageThreadUserName,
      currentMessageThreadName,
      allMessageThreads,
      firstname,
      newMessageSent,
      role,
      userChangedCurrentThread,
      userReceivedANewMessage,
      messagesNotification
    } = this.props;

    let MessagingHeaderMessage = '';
    
    if (currentMessageThreadName === '') {
      if (role) {
        MessagingHeaderMessage = role.Donor ? 'Get in touch with Organizations on your home page' : 'No one has contacted you yet, improve your Organization\'s page to be contacted';
      }
    } else {
      MessagingHeaderMessage = 'Check how everybody has been doing';
    }

    return (
      <div className="messaging-view-container" >
        <div className="messaging-top-message-container">
          <p className="messaging-top-message">{MessagingHeaderMessage}</p>
        </div>
        <div className="messaging-container" >
          <div className="messaging-thread-container" >
          <MessageThread 
            currentMessageThread={currentMessageThread}
            currentMessageThreadUserName={currentMessageThreadUserName}
            currentMessageThreadName={currentMessageThreadName}
            curentUserFirstName={firstname}
            newMessageSent={newMessageSent}
            userReceivedANewMessage={userReceivedANewMessage}
          />
          </div>
          <div className="messaging-history-container" >
            <MessageHistory 
              allMessageThreads={allMessageThreads}
              currentMessageThreadName={currentMessageThreadName}
              role={role}
              userChangedCurrentThread={userChangedCurrentThread}
              messagesNotification={messagesNotification}
            />
          </div>
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
    getUserInformation: PropTypes.func.isRequired,
    userChangedCurrentThread: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, messaging }) => {
  return {
    currentMessageThreadUserName: messaging.currentMessageThreadUserName,
    currentMessageThreadName: messaging.currentMessageThreadName,
    currentMessageThread: messaging.currentMessageThread,
    allMessageThreads: messaging.allMessageThreads,
    messagesNotification: messaging.messagesNotification,
    firstname: auth.firstname,
    role: auth.role
  };
}

const matchDispatchToProps = dispatch => bindActionCreators(
  {
    newMessageSent,
    getUserInformation,
    userChangedCurrentThread,
    userReceivedANewMessage
  }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Messaging);

