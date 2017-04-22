const mongoose = require('mongoose');
require('dotenv-safe').load();

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       
var mongodbUri = process.env.MONGO_DB_URI;

//Comment the following line to run on local host
mongoose.connect(mongodbUri, options);
 
// Un-comment the following line to run on local host
// mongoose.connect('mongodb://localhost/users');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', () => {
  //Un-comment the following line to drop the DB:
  // db.dropDatabase();
  console.log('db connected with mongoose');
});


