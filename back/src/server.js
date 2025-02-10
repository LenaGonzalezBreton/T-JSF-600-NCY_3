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

// Gestion des connexions WebSocket
io.on("connection", (socket) => {
    console.log(`🟢 Nouvelle connexion: ${socket.id}`);

    // 🔹 Inscription d'un utilisateur
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

    // 🔹 Connexion d'un utilisateur
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

    // Gestion de la déconnexion
    socket.on("disconnect", () => {
        console.log(`🔴 Déconnexion: ${socket.id}`);
    });
});

server.listen(PORT, () => console.log(`🚀 Serveur WebSocket démarré sur le port ${PORT}`));
