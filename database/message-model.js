const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageSchema = new mongoose.Schema({
    from: {type:String, required: true},
    to: {type:String, required: true},
    time: { type: Date, default: Date.now },
    message: {type:String, required: true},
});

const messageThreadSchema = mongoose.Schema({
  threadName: {type:String, required: true},
  nameUserOne: {type:String, required: true},
  nameUserTwo: {type:String, required: true},
  messages: [messageSchema],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);
const MessageThread = mongoose.model('MessageThread', messageThreadSchema);

module.exports = {
  Message,
  MessageThread,
};
