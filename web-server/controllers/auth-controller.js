const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { User, Role, Industry } = require('../../database/user-model');
const { createRole, createIndustry } = require('../utils.js');

module.exports.signUpRequest = (req, res) => {
  const { email, password } = req.body;
  const newUser = new User;
  newUser.email = email;
  newUser.password = password;
  newUser.save((err, user) => {
    if (err) {
      throw err;
    } else {
      return res.send({
        email: email,
        completedProfile: user.completedProfile
      });
    }
  }).catch(err => {
    throw err;
  });
};

module.exports.signUpCompletedRequest = (req, res) => {
  const { email, role, industry } = req.body;
  User.findOne({ 'email': email }, (err, user) => {
    if (err) {
      throw err;
    } else {
      let newRole = createRole(role);
      let newIndustry = createIndustry(industry);

      user.completedProfile = true;
      user.role = newRole;
      user.industry = newIndustry;

      return user;
    }
  }).then(user => {
    return user.save((err, updatedUser) => {
      if (err) throw err;
      return res.send({
        email: email,
        completedProfile: true
      });
    })        
  }).catch(err => {
    throw err;
  });
};
