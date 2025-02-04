// src/server.js
const http = require('http');
const app = require('./app');
const { initSocket } = require('./sockets/socketHandler');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Initialiser Socket.IO sur le serveur
initSocket(server);

server.listen(PORT, () => {
    console.log(`Le serveur écoute sur le port ${PORT}`);
});
