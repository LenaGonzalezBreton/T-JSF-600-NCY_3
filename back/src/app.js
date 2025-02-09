// src/app.js
const express = require('express');
const cors = require('cors'); // Importer cors
const channelRoutes = require('./routes/channelRoutes');
const app = express();

// Activer CORS pour toutes les routes
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Routes de l'API
app.use('/', channelRoutes);

// Middleware de gestion des erreurs (exemple simple)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Quelque chose a mal tourné!' });
});

module.exports = app;
