const { signUpRequest, signUpCompletedRequest } = require('./auth-controller');
const { User } = require('../../database/user-model');
const { createRole, createIndustry, createProject } = require('../utils/utils-profile');
const { generateHashedPassword } = require('../utils/utils-auth');
const { generateDummyData } = require('../../database/demo-data');

module.exports.createDummyUsers = (req, res) => {
  const dummyData = generateDummyData();
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