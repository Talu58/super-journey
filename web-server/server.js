const express = require('express');
const path = require('path');
const bodyParser = require ('body-parser');
const routes = require('./routes');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const db = require('../database/db-config.js');

require('dotenv-safe').load();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
routes(app, express);
app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});


// SOCKET.IO MANAGEMENT //
io.on('connection', function(socket) {  
  console.log('A user connected');
  socket.on('subscribe to threads', threads => {
    // Subscription to all the previous conversations
    threads.forEach(thread => {
      socket.join(thread.threadName);
    });
  });

  socket.on('new message', newMessage => {
    socket.broadcast.to(newMessage.threadName).emit('new message', {
      message: newMessage
    });
  });

  socket.on('logout', threads => {
    // Unsubscription from all conversations
    threads.forEach(thread => {
      socket.leave(thread.threadName);
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

});

///////////////////////////////////////////////////////

http.listen(PORT, () => {
  console.log('Server is up and running on port:', PORT);
});



