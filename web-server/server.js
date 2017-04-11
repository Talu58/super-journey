const express = require('express');
const path = require('path');
const multer  = require('multer');
const bodyParser = require ('body-parser');
const routes = require('./routes');


const app = express();
const db = require('../database/db-config.js');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
routes(app, express);
app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server is up and running on port:', PORT);
});



