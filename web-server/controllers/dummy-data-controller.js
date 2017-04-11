const { signUpRequest, signUpCompletedRequest } = require('./auth-controller');
const { User } = require('../../database/user-model');
const { createRole, createIndustry, createProject } = require('../utils/utils-profile');
const { generateHashedPassword } = require('../utils/utils-auth');
const { generateDummyNonProfitData, generateDummyDonorData } = require('../../database/demo-data');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.createDummyNonProfitUsers = (req, res) => {
  const dummyData = generateDummyNonProfitData();
  dummyData.forEach(user => {
    const { email, password, industry, role, project } = user;
    const newUser = new User;
    newUser.email = email;

    let newRole = createRole(role);
    let newIndustry = createIndustry(industry);
    let newProject = createProject(project);

    newUser.completedProfile = true;
    newUser.role = newRole;
    newUser.industry = newIndustry;
    newUser.project = newProject;

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
  const { email, password, industry, role } = generateDummyDonorData();
  const newUser = new User;
  newUser.email = email;

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
          token
        };
        res.send(responseUserData);
      }
    })
  }).catch(err => {
    throw err;
  });

}
