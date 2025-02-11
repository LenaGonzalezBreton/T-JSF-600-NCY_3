require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
});

const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

app.use(cors());
app.use(express.json());

io.on("connection", async (socket) => {
    console.log(`🟢 Nouvelle connexion: ${socket.id}`);

    // 🔹 Authentification via le token WebSocket
    const token = socket.handshake.auth?.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
            if (user) {
                socket.username = user.username; // 🔥 Associer le pseudo à la session WebSocket
                console.log(`✅ Utilisateur connecté : ${user.username}`);
            }
        } catch (error) {
            console.error("❌ Erreur d'authentification WebSocket :", error);
        }
    }

    // 🔹 Gestion de l'inscription
    socket.on("register", async ({ username, email, password }, callback) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: { username, email, password: hashedPassword },
            });
            callback({ success: true, message: "Inscription réussie !" });
        } catch (error) {
            callback({ success: false, message: "Erreur lors de l'inscription" });
        }
    });

    // 🔹 Gestion de la connexion
    socket.on("login", async ({ email, password }, callback) => {
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) return callback({ success: false, message: "Utilisateur non trouvé" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return callback({ success: false, message: "Mot de passe incorrect" });

            const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });

            callback({ success: true, token, user: { id: user.id, username: user.username, email: user.email } });
        } catch (error) {
            callback({ success: false, message: "Erreur lors de la connexion" });
        }
    });

    // 🔹 Réception et diffusion des messages
    socket.on("chatMessage", (msg) => {
        if (!socket.username) {
            console.warn("🚨 Un utilisateur non authentifié tente d'envoyer un message !");
            return;
        }

        console.log(`💬 Message de ${socket.username} : ${msg}`);

        // 🔥 Diffuser le message avec le pseudo de l'expéditeur
        io.emit("chatMessage", { sender: socket.username, message: msg });
    });

    // 🔹 Gestion de la déconnexion
    socket.on("disconnect", () => {
        console.log(`🔴 Déconnexion: ${socket.id}`);
    });
});

server.listen(PORT, () => console.log(`🚀 Serveur WebSocket démarré sur le port ${PORT}`));
