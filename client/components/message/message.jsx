import React, { Component, PropTypes } from 'react';
import './_message.sass';
import moment from 'moment';

export default class Message extends Component {
  render() {
    const { message, curentUserFirstName, displayTime } = this.props;
    let messageClass = 'message';
    let messageTimeClass = 'message-time';

    if (message.from === curentUserFirstName) {
      messageClass += ' message-from';
      messageTimeClass += '-from';
    } else {
      messageClass += ' message-to';
      messageTimeClass += '-to';
    }
    return (
      <div className="message-container">
        { displayTime ? <p className={messageTimeClass}>{moment(message.time).fromNow()}</p> : null}
        <p  className={messageClass}>{message.message}</p>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  displayTime: PropTypes.bool.isRequired,
  curentUserFirstName: PropTypes.string.isRequired,
};