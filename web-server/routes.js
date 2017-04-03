const { signUpRequest, signUpCompletedRequest, loginRequest } = require('./controllers/auth-controller');

module.exports = function(app, express) {

  app.post('/user/signup', signUpRequest);
  app.post('/user/signup/completed', signUpCompletedRequest);
  app.post('/user/login', loginRequest);
}