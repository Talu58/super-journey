const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { User } = require('../../database/user-model');
const { MessageThread, Message } = require('../../database/message-model');
const { createMessage } = require('../utils/utils-messaging');


module.exports.userSentFirstMessage = (req, res) => {
  const { recipientEmail, senderEmail, to, from } = req.body;
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
          nameUserOne: to,
          nameUserTwo: from,
          messages: [newMessage]
        });
        newMessageThread.save((err, messageThread) => {
          if (err) throw err;
          User.findOne({ 'email': recipientEmail }, (err, user) => {
            if (err) throw err;
            user.messageThreadsNames.push(messageThreadName);
            return user.save((err) => {
              if (err) throw err;
            });
          }).then(() => {
            return User.findOne({ 'email': senderEmail }, (err, user) => {
              if (err) throw err;
              user.messageThreadsNames.push(messageThreadName);
              return user.save((err) => {
                if (err) throw err;
              });
            });
          }).then(()=> {
            return res.send(messageThread);
          });
        });
      }
    })
    .catch(err => {
      console.log('userSentFirstMessage err', err);
    });
};


module.exports.userSentNewMessage = (req, res) => {
    const { threadName } = req.body;
    MessageThread.findOne({threadName: threadName}, (err, thread) => {
      if (err) {
        throw err;
      }
      const newMessage = createMessage(req.body);
      thread.messages.push(newMessage);
      thread['updated_at'] = new Date();
      thread.save((err, messageThread) => {
        if (err) {
          return console.error(err);
        }
        res.send(messageThread);
      });
    });
};

module.exports.getUserMessagesRequest = (req, res) => {
  User.findOne({email: req.params.userEmail}, (err, user) => {
    if (err) {
      throw err;
    }
    //implement promiseAll
    let allMessagesThreads = []
    const messageThreadsNamesPromisified = user.messageThreadsNames.map(threadName => {
      return MessageThread.findOne({threadName: threadName}, (err, thread) => {
        if (err) {
          throw err;
        }
        allMessagesThreads.push(thread);
      });
    });
    Promise.all(messageThreadsNamesPromisified).then(() => {
      return res.send(allMessagesThreads);
    });
  }).catch(err => {
    throw err;
  });
}