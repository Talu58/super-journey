const { 
  signUpRequest,
  signUpCompletedRequest,
  loginRequest,
  getUserInformationRequest,
} = require('./controllers/auth-controller');
const {
  getIndustryMatchesRequest,
  getAllProjectsRequest
}= require('./controllers/search-controller');
const {
  createDummyUsers
} = require('./controllers/dummy-data-controller');

module.exports = function(app, express) {

  app.post('/user/signup', signUpRequest);
  app.post('/user/signup/completed', signUpCompletedRequest);
  app.post('/user/login', loginRequest);
  app.get('/user/information/:userEmail', getUserInformationRequest);
  app.get('/projects/match/:industryName', getIndustryMatchesRequest);
  app.get('/projects/all', getAllProjectsRequest);
  app.get('/user/dummy', createDummyUsers);

}