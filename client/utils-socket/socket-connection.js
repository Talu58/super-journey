// Initialization of Socket.io for live chatting feature

const io = require('socket.io-client');
const socket = io('http://localhost:3000');

export default socket;