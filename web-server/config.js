require('dotenv-safe').load();

// Json web token secret setup
module.exports.jwtSecret = process.env.JWT_SECRET;