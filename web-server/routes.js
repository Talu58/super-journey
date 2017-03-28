module.exports = function(app, express) {

  app.post('/user/signup', (req, res) => {
    console.log(req.body);

    res.send({
      email: req.body.email,
      completedProfile: true
    });
  })
}