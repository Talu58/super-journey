const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { User, Role, Industry } = require('../database/user-model');

module.exports = function(app, express) {

  app.post('/user/signup', (req, res) => {
    const { email, password } = req.body;
    const newUser = new User;
    newUser.email = email;
    newUser.password = password;
    newUser.save((err, user) => {
      if (err) {
        throw err;
      } else {
        return res.send({
          email: req.body.email,
          completedProfile: user.completedProfile
        });
      }
    }).catch(err => {
      throw err;
    })
  });

  app.post('/user/signup/completed', (req, res) => {
    console.log(req.body);
    const { email, role, industry } = req.body;
    console.log(email);
    User.findOne({ 'email': email }, (err, user) => {
      if (err) {
        throw err;
      } else {
        let newRole = new Role;
        newRole = {
          Donor: role.Donor,
          'Non-Profit Organization': role['Non-Profit Organization']
        };
        newIndustry = {
          Healthcare: industry.Healthcare,
          Tech: industry.Tech,
          Climat: industry.Climat,
          Inclusion: industry.Inclusion,
          'Global Change': industry['Global Change']
        };
        console.log('newRole', newRole);
        console.log('newIndustry', newIndustry);
        user.completedProfile = true;
        user.role = newRole;
        user.industry = newIndustry;
    
        user.save((err, updatedUser) => {
          if (err) throw err;
          return res.send({
            email: req.body.email,
            completedProfile: true
          });
        })        
      }
    }).catch(err => {
      throw err;
    })
  })
}