const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = mongoose.Schema({
  Donor: {type: Boolean, default: false},
  'Non-Profit Organization': {type: Boolean, default: false},
});

const industrySchema = mongoose.Schema({
  Healthcare: {type: Boolean, default: false},
  Tech: {type: Boolean, default: false},
  Climate: {type: Boolean, default: false},
  Inclusion: {type: Boolean, default: false},
  'Global Change': {type: Boolean, default: false}
});

const organizationSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true}
})

const userSchema = mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  completedProfile:   {type: Boolean, default: false},
  role: roleSchema,
  industry: industrySchema,
  organization: organizationSchema,
  messageThreadsNames: {type: Array, default: []},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Role = mongoose.model('Role', roleSchema);
const Industry = mongoose.model('Industry', industrySchema);
const Organization = mongoose.model('Organization', organizationSchema);

module.exports = {
  User,
  Role,
  Industry,
  Organization
};
