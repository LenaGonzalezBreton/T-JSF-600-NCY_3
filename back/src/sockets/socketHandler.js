// src/sockets/socketHandler.js
const socketIO = require('socket.io');
const persistenceService = require('../services/persistenceService');

let io;

exports.initSocket = (server) => {
    io = socketIO(server);
    io.on('connection', (socket) => {
        console.log(`Nouvelle connexion : ${socket.id}`);

        socket.on('setNickname', (nickname) => {
            socket.nickname = nickname;
            socket.emit('nicknameSet', nickname);
        });

        socket.on('joinChannel', (channelName) => {
            // Exemple simplifié : gestion du canal via le service de persistance
            const channels = persistenceService.getChannels();
            if (!channels[channelName]) {
                channels[channelName] = { messages: [], users: [] };
            }
            if (!channels[channelName].users.includes(socket.nickname)) {
                channels[channelName].users.push(socket.nickname);
            }
            socket.join(channelName);
            io.to(channelName).emit('userJoined', { channel: channelName, user: socket.nickname });
            persistenceService.saveChannels(channels);
        });

        // Autres événements (leaveChannel, sendMessage, createChannel, etc.)...

        socket.on('disconnect', () => {
            console.log(`Déconnexion : ${socket.id}`);
            // Gérer le retrait de l'utilisateur de chaque canal...
        });
    });
};
