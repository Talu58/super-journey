const { signUpRequest, signUpCompletedRequest } = require('./auth-controller');
const { User } = require('../../database/user-model');
const { MessageThread, Message } = require('../../database/message-model');
const { createRole, createIndustry, createOrganization } = require('../utils/utils-profile');
const { generateHashedPassword } = require('../utils/utils-auth');
const { generateDummyNonProfitData, generateDummyDonorData, generateNewThread } = require('../../database/demo-data-builders');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.createDummyNonProfitUsers = (req, res) => {
  const dummyData = generateDummyNonProfitData();
  const dummyDataPromisified = dummyData.map(user => {
    const { email, password, industry, role, organization, firstname, lastname } = user;
    console.log('email', email);
    const newUser = new User;
    newUser.email = email;
    newUser.firstname = firstname;
    newUser.lastname = lastname;

    let newRole = createRole(role);
    let newIndustry = createIndustry(industry);
    let newOrganization = createOrganization(organization);

    newUser.completedProfile = true;
    newUser.role = newRole;
    newUser.industry = newIndustry;
    newUser.organization = newOrganization;

    return generateHashedPassword(password).then(hash => {
      newUser.password = hash;
    }).then( () => {
      return newUser.save((err, user) => {
        if (err) {
          throw err;
        } 
      })
    }).catch(err => {
      throw err;
    });
  });
  Promise.all(dummyDataPromisified).then(() => {
    return res.send();
  });
};

module.exports.createDummyDonorUser = (req,res) => {
  const { email, password, industry, role, firstname, lastname } = generateDummyDonorData();
  const newUser = new User;
  newUser.email = email;
  newUser.firstname = firstname;
  newUser.lastname = lastname;

  let newRole = createRole(role);
  let newIndustry = createIndustry(industry);

  newUser.completedProfile = true;
  newUser.role = newRole;
  newUser.industry = newIndustry;

  generateHashedPassword(password).then(hash => {
    newUser.password = hash;
  }).then( () => {
    return newUser.save((err, user) => {
      if (err) {
        throw err;
      } else {
        const { completedProfile, role, industry, email } = user; 
        const token = jwt.sign({
            email,
            completedProfile,
          }, config.jwtSecret);

        const responseUserData = {
          completedProfile,
          role,
          industry,
          email,
          token,
          firstname,
          lastname
        };
        res.send(responseUserData);
      }
    })
  }).catch(err => {
    throw err;
  });

};

module.exports.createDummyMessages = (req, res) => {
  const { threadName, nameUserOne, nameUserTwo, messages, recipientEmail, senderEmail } = generateNewThread();
  const newMessageThread = new MessageThread({
    threadName: threadName,
    nameUserOne: nameUserOne,
    nameUserTwo: nameUserTwo,
    messages: messages
  });
  newMessageThread.save((err, messageThread) => {
    if (err) throw err;
    User.findOne({ 'email': recipientEmail }, (err, user) => {
      if (err) {
        throw err;
      }
        console.log('cannot find user1', user)
      user.messageThreadsNames.push(threadName);
      return user.save((err) => {
        if (err) throw err;
      });
    }).then(() => {
      return User.findOne({ 'email': senderEmail }, (err, user) => {
        if (err) {
          throw err;
        }
          console.log('cannot find johnDoe', user);
        user.messageThreadsNames.push(threadName);
        return user.save((err) => {
          if (err) throw err;
        });
      });
    }).then(()=> {
      return res.send(messageThread);
    });
  })
  .catch(err => {
    console.log('userSentFirstMessage err', err);
  });
};
