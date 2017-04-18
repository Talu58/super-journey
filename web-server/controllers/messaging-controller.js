const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { MessageThread, Message } = require('../../database/message-model');
const { createMessage } = require('../utils/utils-messaging');


module.exports.userSentFirstMessage = (req, res) => {
  const { recipientEmail, senderEmail, recipient, sender } = req.body;
  const newMessage = createMessage(req.body);
  const messageThreadName = recipientEmail + '-' + senderEmail;
  MessageThread.findOne({})
    .where('threadName').equals(messageThreadName)
    .exec((err, messageThread) => {
      if (err) {
        console.log('messageThread err', err);
      }
      if (messageThread) {
        //implement adding new message to existing message thread
        return res.send({});
      } else {
        newMessageThread = new MessageThread({
          threadName: messageThreadName,
          nameUserOne: recipient,
          nameUserTwo: sender,
          messages: [newMessage]
        });
        newMessageThread.save(function (err, messageThread) {
          if (err) return console.error(err);
          return res.send(messageThread);
        });
      }
    });
}