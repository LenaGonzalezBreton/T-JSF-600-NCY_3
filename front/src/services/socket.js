import { io } from "socket.io-client";

// Remplace par l'URL de ton serveur
const socket = io("http://localhost:3000");

export default socket;
