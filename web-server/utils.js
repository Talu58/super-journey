const { User, Role, Industry } = require('../database/user-model');


module.exports.createRole = role => {
  let newRole = new Role;
  newRole = {
    Donor: role.Donor,
    'Non-Profit Organization': role['Non-Profit Organization']
  };
  return newRole;
};

module.exports.createIndustry = industry => {
  let newIndustry = new Industry;
  newIndustry = {
    Healthcare: industry.Healthcare,
    Tech: industry.Tech,
    Climat: industry.Climat,
    Inclusion: industry.Inclusion,
    'Global Change': industry['Global Change']
  };
  return newIndustry;
};