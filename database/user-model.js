const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = mongoose.Schema({
  Donor: {type: Boolean, default: false},
  'Non-Profit Organization': {type: Boolean, default: false},
});

const industrySchema = mongoose.Schema({
  Healthcare: {type: Boolean, default: false},
  Tech: {type: Boolean, default: false},
  Climat: {type: Boolean, default: false},
  Inclusion: {type: Boolean, default: false},
  'Global Change': {type: Boolean, default: false}
});

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
const Role = mongoose.model('Role', roleSchema);
const Industry = mongoose.model('Industry', industrySchema);

module.exports = {
  User,
  Role,
  Industry
};
