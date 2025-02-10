// src/app.js
const express = require('express');
const cors = require('cors'); // Importer cors
const channelRoutes = require('./routes/channelRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();

// Activer CORS pour toutes les routes
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Routes de l'API
app.use('/', channelRoutes);

// Routes d'authentification
app.use('/auth', authRoutes);

// Routes des channels
app.use('/', channelRoutes);

// Routes des utilisateurs
app.use('/users', userRoutes);


// Middleware de gestion des erreurs (exemple simple)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Quelque chose a mal tourné!' });
});

module.exports = app;
