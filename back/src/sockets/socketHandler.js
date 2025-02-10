// back/src/sockets/socketHandler.js
const socketIO = require('socket.io');
const persistenceService = require('../services/persistenceService'); // Pour la persistance si nécessaire

let io;

exports.initSocket = (server) => {
    io = socketIO(server, {
        cors: {
            origin: "*", // Pour le développement, autorise toutes les origines. En prod, précisez l'URL de votre front.
            methods: ['GET', 'POST']
        },
        transports: ['websocket', 'polling']
    });

    io.on('connection', (socket) => {
        console.log(`Nouvelle connexion : ${socket.id}`);

        // Définir le pseudo de l'utilisateur
        socket.on('setNickname', (nickname) => {
            socket.nickname = nickname;
            socket.emit('nicknameSet', nickname);
        });

        // Rejoindre un canal
        socket.on('joinChannel', (channelName) => {
            // Exemple simplifié avec persistance locale (vous pouvez adapter pour utiliser Prisma)
            let channels = persistenceService.getChannels();
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

        // Envoyer un message dans un canal
        socket.on('sendMessage', (messageData) => {
            console.log(`Message de ${messageData.username} sur ${messageData.channel}: ${messageData.text}`);
            // Ici, vous pouvez ajouter la persistance du message en base via Prisma si nécessaire
            io.to(messageData.channel).emit('newMessage', messageData);
        });

        // Déconnexion
        socket.on('disconnect', () => {
            console.log(`Déconnexion : ${socket.id}`);
            // Ici, gérez éventuellement le retrait de l'utilisateur de chaque canal
        });
    });
};
