// src/sockets/socketHandler.js
const socketIO = require('socket.io');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

let io;

exports.initSocket = (server) => {
    const io = require("socket.io")(server, {
        cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
    });

    console.log("🔌 WebSocket serveur initialisé...");

    io.on("connection", (socket) => {
        console.log(`🟢 Nouvelle connexion WebSocket : ${socket.id}`);

        socket.on("register", async ({ username, email, password }, callback) => {
            console.log(`📩 Requête d'inscription reçue:`, { username, email, password });
            callback({ success: true, message: "Inscription reçue" });
        });

        socket.on("disconnect", () => {
            console.log(`🔴 Déconnexion WebSocket : ${socket.id}`);
        });
    });
};
