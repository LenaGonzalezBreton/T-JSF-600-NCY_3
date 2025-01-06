// Importation des bibliothèques nécessaires
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const Message = require('./models/Message');
const { addUser, removeUser, getUser, getUsersInChannel } = require('./users');
const { createChannel, deleteChannel, renameChannel, getChannel, getChannels } = require('./channels');

// Création de l'application Express
const app = express();
// Création du serveur HTTP
const server = http.createServer(app);
// Initialisation de Socket.IO avec le serveur HTTP
const io = socketIo(server);

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/chat', { useNewUrlParser: true, useUnifiedTopology: true });

// Servir les fichiers statiques du dossier 'public'
app.use(express.static('public'));

// Gestion des connexions Socket.IO
io.on('connection', (socket) => {
    console.log('Nouvel utilisateur connecté');

    // Gestion de l'événement 'join' pour rejoindre un canal
    socket.on('join', async ({ name, channel }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, channel });
        if (error) return callback(error);

        socket.join(user.channel);
        socket.emit('message', { user: 'admin', text: `${user.name}, bienvenue dans le canal ${user.channel}` });
        socket.broadcast.to(user.channel).emit('message', { user: 'admin', text: `${user.name} a rejoint le canal !` });

        const messages = await Message.find({ channel: user.channel });
        socket.emit('loadMessages', messages);

        io.to(user.channel).emit('channelData', { channel: user.channel, users: getUsersInChannel(user.channel) });

        callback();
    });

    // Gestion de l'événement 'sendMessage' pour envoyer un message
    socket.on('sendMessage', async (message, callback) => {
        const user = getUser(socket.id);
        const newMessage = new Message({ user: user.name, channel: user.channel, text: message });
        await newMessage.save();

        io.to(user.channel).emit('message', { user: user.name, text: message });
        callback();
    });

    // Gestion de l'événement 'disconnect' pour la déconnexion d'un utilisateur
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.channel).emit('message', { user: 'admin', text: `${user.name} a quitté le canal.` });
            io.to(user.channel).emit('channelData', { channel: user.channel, users: getUsersInChannel(user.channel) });
        }
    });
});

// Démarrage du serveur sur le port 5000
server.listen(5000, () => console.log('Le serveur a démarré sur le port 5000'));
