var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.generateHashedPassword = password => {
  return bcrypt.hash(password, saltRounds).then(hash => {
        console.log('generateHashedPassword', hash);
    return hash;
  }).catch(err => {
    console.log('generateHashedPassword', err);
  });
};

module.exports.compareHashedPassword = (password, hash) => {
  return bcrypt.compare(password, hash).then(isValid => {
    return isValid;
  })
};

