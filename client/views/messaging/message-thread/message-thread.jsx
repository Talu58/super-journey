import React, { Component } from 'react';
import './_message-thread.sass';
import Message from '../../../components/message/message';
import Button from '../../../components/button/button';
import TextAreaField from '../../../components/text-area-field/text-area-field';
import moment from 'moment';
import socket from '../../../utils-socket/socket-connection.js';

export default class MessageThread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageInputFieldValue: ''
    }
    this.newMessageInputFieldChange = this.newMessageInputFieldChange.bind(this);
    this.sendNewMessageClicked=this.sendNewMessageClicked.bind(this);
    this.shouldDisplayTime = this.shouldDisplayTime.bind(this);
    this.newMessageReceived = this.newMessageReceived.bind(this);
  }

  componentDidMount() {
    socket.on('new message', newMessage => {
      this.newMessageReceived(newMessage);
    });
  }

  newMessageReceived(newMessage) {
    const { userReceivedANewMessage, currentMessageThreadName } = this.props;
    userReceivedANewMessage(newMessage, currentMessageThreadName);
  }

  newMessageInputFieldChange(e) {
    let newMessageInputFieldValue = e.target.value;
    this.setState({
      messageInputFieldValue: newMessageInputFieldValue
    });
  }

  sendNewMessageClicked() {
    const { newMessageSent, currentMessageThreadName, currentMessageThreadUserName, curentUserFirstName } = this.props;
    if (this.state.messageInputFieldValue !== '') {
      const newMessage = {
        message: this.state.messageInputFieldValue,
        to: currentMessageThreadUserName,
        from: curentUserFirstName,
        threadName: currentMessageThreadName,
        time: new Date(),
        _id: Math.floor(Math.random() * 1000)
      };
      newMessageSent(newMessage);
      socket.emit('new message', newMessage);
      this.setState({
        messageInputFieldValue: ''
      });
    }
  }

  shouldDisplayTime(timeOne, timeTwo) {
    let displayTime = true;
    // Time is only displayed if there is more than 30min between messages
    if (moment(timeOne).fromNow() === moment(timeTwo).fromNow() || moment.duration(moment(timeOne) - moment(timeTwo)).asMinutes() < 30) {
      displayTime = false;
    }
    return displayTime;
  }

  render() {
    const { currentMessageThread, currentMessageThreadUserName, curentUserFirstName } = this.props;
    return (
      <div>
        <div  className="messaging-thread-header-container">
          <h1 className="messaging-thread-header">Discussion with {currentMessageThreadUserName}</h1>
        </div>
        <div className="messages-container">
          <div className="messages-container-inner">
            {currentMessageThread.map((message, i, messageList) => {
              let displayTime = i === 0 ? true : this.shouldDisplayTime(message.time, messageList[i-1].time);
              return (
                <Message
                  key={message['_id']}
                  message={message}
                  displayTime={displayTime}
                  curentUserFirstName={curentUserFirstName}
                />
              );
            })}
          </div>
        </div>
        <div className="messaging-thread-new-message-container">
          <TextAreaField
            placeholderText="Write your message here"
            changeHandler={this.newMessageInputFieldChange}
            value={this.state.messageInputFieldValue}
            styleClassName="messaging-thread-new-message-text-area-field"
            containerStyleClassName="messaging-thread-new-message-text-area-field-container"
            row={3}
          />
          <Button
            value="Send"
            styleClassName="button-primary"
            clickHandler={this.sendNewMessageClicked}
            containerStyleClassName="messaging-thread-new-message-button-container"
          />
        </div>
      </div>
    );
  }
};

