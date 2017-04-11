const { 
  signUpRequest,
  signUpCompletedRequest,
} = require('./auth-controller');
const {
  generateDummyData
} = require('../../database/demo-data');

module.exports.createDummyUsers = (req, res) => {
  console.log('createDummyUsers invoked');
  const dummyData = generateDummyData;
  console.log(dummyData);
};