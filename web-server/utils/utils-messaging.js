const { Message } = require('../../database/message-model');

module.exports.createMessage = message => {
  let newMessage = new Message;
  newMessage = {
    to: message.recipient,
    from: message.sender,
    message: message.message
  };
  return newMessage;
};