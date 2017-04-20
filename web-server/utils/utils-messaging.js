const { Message } = require('../../database/message-model');

module.exports.createMessage = message => {
  let newMessage = new Message;
  newMessage = {
    to: message.to,
    from: message.from,
    message: message.message,
    time: message.time
  };
  return newMessage;
};