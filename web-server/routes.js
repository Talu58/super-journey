const { 
  signUpRequest,
  signUpCompletedRequest,
  loginRequest,
} = require('./controllers/auth-controller');
const {
  getIndustryMatchesRequest
}= require('./controllers/search-controller');

module.exports = function(app, express) {

  app.post('/user/signup', signUpRequest);
  app.post('/user/signup/completed', signUpCompletedRequest);
  app.post('/user/login', loginRequest);
  app.get('/matches/:industry', getIndustryMatchesRequest);
}