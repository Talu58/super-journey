const { 
  signUpRequest,
  signUpCompletedRequest,
  loginRequest,
  getUserInformationRequest,
  imageUploadRequest,
  changePasswordRequest,
  updateOrganizationInformation
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
  userSentFirstMessage,
  userSentNewMessage,
  getUserMessagesRequest
} = require('./controllers/messaging-controller');

module.exports = function(app, express) {
  app.post('/user/signup', signUpRequest);
  app.post('/user/signup/completed', signUpCompletedRequest);
  app.post('/user/organization/image/upload', imageUploadRequest);
  app.post('/user/organization/update', updateOrganizationInformation);
  app.post('/user/login', loginRequest);
  app.post('/user/password/change', changePasswordRequest);

  app.get('/user/information/:userEmail', getUserInformationRequest);
  app.get('/user/dummy/non-profit', createDummyNonProfitUsers);
  app.get('/user/dummy/donor', createDummyDonorUser);
  app.get('/user/messages/:userEmail', getUserMessagesRequest);
  
  app.get('/organizations/match/:industryName', getIndustryMatchesRequest);
  app.get('/organizations/all', getAllOrganizationsRequest);

  app.post('/message/first', userSentFirstMessage);
  app.post('/message/new', userSentNewMessage);
};