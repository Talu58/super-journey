const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  //uncomment the following line to drop the DB:
  // db.dropDatabase();
  console.log('db connected with mongoose');
})
