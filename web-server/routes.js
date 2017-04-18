const { 
  signUpRequest,
  signUpCompletedRequest,
  loginRequest,
  getUserInformationRequest,
  imageUploadRequest
} = require('./controllers/auth-controller');
const {
  getIndustryMatchesRequest,
  getAllOrganizationsRequest
}= require('./controllers/search-controller');
const {
  createDummyNonProfitUsers,
  createDummyDonorUser
} = require('./controllers/dummy-data-controller');
const {
  userSentFirstMessage
} = require('./controllers/messaging-controller');

module.exports = function(app, express) {
  app.post('/user/signup', signUpRequest);
  app.post('/user/signup/completed', signUpCompletedRequest);
  app.post('/user/organization/image/upload', imageUploadRequest);
  app.post('/user/login', loginRequest);
  app.get('/user/information/:userEmail', getUserInformationRequest);
  app.get('/user/dummy/non-profit', createDummyNonProfitUsers);
  app.get('/user/dummy/donor', createDummyDonorUser);
  
  app.get('/organizations/match/:industryName', getIndustryMatchesRequest);
  app.get('/organizations/all', getAllOrganizationsRequest);

  app.post('/message/first', userSentFirstMessage)
};