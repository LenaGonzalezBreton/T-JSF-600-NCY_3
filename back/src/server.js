// back/src/server.js
const http = require('http');
const app = require('./app');
const { initSocket } = require('./sockets/socketHandler');

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Initialisation de Socket.IO avec configuration CORS
initSocket(server);

server.listen(PORT, () => {
    console.log(`Le serveur écoute sur le port ${PORT}`);
});
