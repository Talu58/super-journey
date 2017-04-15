const { Role, Industry, Organization } = require('../../database/user-model');


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
    Climate: industry.Climate,
    Inclusion: industry.Inclusion,
    'Global Change': industry['Global Change']
  };
  return newIndustry;
};

module.exports.createOrganization = organization => {
  let newOrganization = new Organization;
  newOrganization = {
    name: organization.name,
    description: organization.description
  };
  return newOrganization;
};

