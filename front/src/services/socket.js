// services/socket.js
import { io } from 'socket.io-client';

// Veillez à utiliser le même port que celui sur lequel le serveur écoute
const socket = io('http://localhost:5000', {
    transports: ['websocket'] // Optionnel, mais parfois utile pour forcer WebSocket
});

export default socket;