const { signUpRequest, signUpCompletedRequest } = require('./auth-controller');
const { User } = require('../../database/user-model');
const { createRole, createIndustry, createOrganization } = require('../utils/utils-profile');
const { generateHashedPassword } = require('../utils/utils-auth');
const { generateDummyNonProfitData, generateDummyDonorData } = require('../../database/demo-data-builders');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.createDummyNonProfitUsers = (req, res) => {
  const dummyData = generateDummyNonProfitData();
  dummyData.forEach(user => {
    const { email, password, industry, role, organization, firstname, lastname } = user;
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

    generateHashedPassword(password).then(hash => {
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
  res.send({});
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

}
