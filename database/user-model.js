const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = mongoose.Schema({
  Donor: {type: Boolean, default: false, required: true},
  'Non-Profit Organization': {type: Boolean, default: false, required: true},
})

const industrySchema = mongoose.Schema({
  Healthcare: {type: Boolean, default: false, required: true},
  Tech: {type: Boolean, default: false, required: true},
  Climat: {type: Boolean, default: false, required: true},
  Inclusion: {type: Boolean, default: false, required: true},
  'Global Change': {type: Boolean, default: false, required: true}
})

const userSchema = mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  completedProfile:   {type: Boolean, default: false},
  role: [roleSchema],
  industry: [industrySchema],
  created_at: Date,
  updated_at: Date
});

const User = mongoose.model('User', userSchema);
