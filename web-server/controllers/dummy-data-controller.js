const { 
  signUpRequest,
  signUpCompletedRequest,
} = require('./auth-controller');
const {
  generateDummyData
} = require('../../database/demo-data');

module.exports.createDummyUsers = (req, res) => {
  const dummyData = generateDummyData();
  res.send({});
};