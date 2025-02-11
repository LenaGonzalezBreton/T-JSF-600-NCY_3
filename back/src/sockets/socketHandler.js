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

        socket.onAny((event, ...args) => {
            console.log(`📡 Événement reçu : ${event}`, args);
        });

        socket.on("getUser", async ({ token }, callback) => {
            console.log("📤 Requête getUser reçue avec token :", token);

            try {
                const decoded = jwt.verify(token, SECRET_KEY);
                console.log("🔑 Token décodé, recherche utilisateur...");
                const user = await prisma.user.findUnique({
                    where: { id: decoded.userId },
                });

                if (!user) {
                    console.log("❌ Utilisateur introuvable !");
                    return callback({ success: false, message: "Utilisateur introuvable" });
                }

                console.log("✅ Utilisateur trouvé :", user.username);
                callback({ success: true, user: { id: user.id, username: user.username, email: user.email } });
            } catch (error) {
                console.error("❌ Erreur getUser :", error);
                callback({ success: false, message: "Token invalide" });
            }
        });
        socket.on("chatMessage", (data) => {
            console.log("📩 Message brut reçu :", data);

            // 🔥 Découper la chaîne pour extraire le sender et le message
            const parts = data.split(": ");
            if (parts.length < 2) {
                console.error("❌ Format invalide reçu :", data);
                return;
            }

            const sender = parts[0];
            const message = parts.slice(1).join(": "); // Rassemble si plusieurs ":"

            console.log(`🚀 Message reformatté : sender=${sender}, message=${message}`);

            io.emit("chatMessage", { sender, message });
        });



        socket.on("login", async ({ email, password }, callback) => {
            console.log(`📩 Requête de connexion reçue:`, { email, password });

            if (!email || !password) {
                return callback({ success: false, message: "Email et mot de passe obligatoires" });
            }

            try {
                console.log("🔍 Recherche de l'utilisateur...");
                const user = await prisma.user.findUnique({ where: { email } });

                if (!user) {
                    return callback({ success: false, message: "Utilisateur non trouvé" });
                }

                console.log("🔑 Vérification du mot de passe...");
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return callback({ success: false, message: "Mot de passe incorrect" });
                }

                console.log("🔑 Génération du token...");
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

                console.log(`✅ Connexion réussie pour: ${user.email}`);
                callback({ success: true, token, user: { id: user.id, username: user.username, email: user.email } });

            } catch (error) {
                console.error("❌ Erreur lors de la connexion:", error);
                callback({ success: false, message: "Erreur interne du serveur" });
            }
        });

        socket.on("updateUser", ({ userId, username }) => {
            console.log(`🔄 Mise à jour du pseudo : ${userId} → ${username}`);
            socket.user = { id: userId, username }; // Met à jour l'objet utilisateur sur la connexion
        });


        socket.on("disconnect", () => {
            console.log(`🔴 Déconnexion WebSocket : ${socket.id}`);
        });
    });
};

