const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { User } = require('../../database/user-model');

module.exports.getIndustryMatchesRequest = (req, res) => {
  const { industryName } = req.params;
  let industryParams = `industry.${industryName}`;
  let roleParams= "role.Donor";

  User.find({})
    .where(roleParams).equals(false)
    .where(industryParams).equals(true)
    .select('project created_at')
    .exec((err, projects) => {
      return res.send({
            matches: projects
      });
  })
  .catch(err => {
    console.log('getIndustryMatchesRequest err', err);
  });
};


module.exports.getAllProjectsRequest = (req, res) => {
  let roleParams= "role.Donor";
  
  User.find({})
    .where(roleParams).equals(false)
    .exec((err, projects) => {
      return res.send({
            projects
      });
    })
    .catch(err => {
    console.log('getAllProjectsRequest err', err);
    });
}




