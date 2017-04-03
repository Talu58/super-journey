const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const User = require('../database/user-model');

module.exports = function(app, express) {

  app.post('/user/signup', (req, res) => {
    const { email, password } = req.body;
    const completedProfile = false;
    console.log('Got here', email, password);
    const newUser = new User;
    newUser.email = email;
    newUser.password = password;
    newUser.save((err, user) => {
      console.log('saving newUser', err, user);
      if (err) {
        console.log('Save err:', err);
      } else {
        console.log('save user:', user);
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

    res.send({
      email: req.body.email,
      completedProfile: true
    });
  })
}