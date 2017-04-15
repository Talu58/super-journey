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
    .select('organization created_at industry email firstname')
    .exec((err, organizations) => {
      return res.send({
            matches: organizations
      });
  })
  .catch(err => {
    console.log('getIndustryMatchesRequest err', err);
  });
};


module.exports.getAllOrganizationsRequest = (req, res) => {
  let roleParams= "role.Donor";
  
  User.find({})
    .where(roleParams).equals(false)
    .select('organization created_at industry')
    .exec((err, organizations) => {
      return res.send({
            organizations
      });
    })
    .catch(err => {
    console.log('getAllOrganizationsRequest err', err);
    });
}




