const express = require('express');
const path = require('path');

const app = express();
const db = require('../database/db-config.js');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server is up and running on port:', PORT);
});



