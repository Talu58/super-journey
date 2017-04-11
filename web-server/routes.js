const { 
  signUpRequest,
  signUpCompletedRequest,
  loginRequest,
  getUserInformationRequest,
  imageUploadRequest
} = require('./controllers/auth-controller');
const {
  getIndustryMatchesRequest,
  getAllProjectsRequest
}= require('./controllers/search-controller');
const {
  createDummyNonProfitUsers,
  createDummyDonorUser
} = require('./controllers/dummy-data-controller');

module.exports = function(app, express) {
  app.post('/user/signup', signUpRequest);
  app.post('/user/signup/completed', signUpCompletedRequest);
  app.post('/user/project/image/upload', imageUploadRequest);
  app.post('/user/login', loginRequest);
  app.get('/user/information/:userEmail', getUserInformationRequest);
  app.get('/projects/match/:industryName', getIndustryMatchesRequest);
  app.get('/projects/all', getAllProjectsRequest);
  app.get('/user/dummy/non-profit', createDummyNonProfitUsers);
  app.get('/user/dummy/donor', createDummyDonorUser);
};