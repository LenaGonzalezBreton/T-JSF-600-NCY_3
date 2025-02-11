import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
    transports: ["websocket"],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: true,
});

socket.on("connect", () => {
    console.log("✅ WebSocket connecté avec succès :", socket.id);
});

socket.on("connect_error", (error) => {
    console.error("❌ Erreur de connexion WebSocket :", error.message);
});

socket.on("disconnect", () => {
    console.log("❌ WebSocket déconnecté");
});

export default socket;
