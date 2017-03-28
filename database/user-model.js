const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  completedProfile:   {type: Boolean, default: false},
  created_at: Date,
  updated_at: Date
});

const User = mongoose.model('User', userSchema);
