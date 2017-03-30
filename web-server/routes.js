module.exports = function(app, express) {

  app.post('/user/signup', (req, res) => {
    const completedProfile = false;
    if (!completedProfile) {
      res.send({
        email: req.body.email,
        completedProfile: false
      });
    } else {
      res.send({
        email: req.body.email,
        completedProfile: true
      });
    }
  })

  app.post('/user/signup/completed', (req, res) => {
    console.log(req.body);

    res.send({
      email: req.body.email,
      completedProfile: true
    });
  })
}