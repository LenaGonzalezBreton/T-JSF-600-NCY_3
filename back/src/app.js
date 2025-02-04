// src/app.js
const express = require('express');
const apiRoutes = require('./routes/api');
const app = express();

// Middlewares pour parser le JSON et gérer le CORS par exemple
app.use(express.json());
// app.use(cors()); // à décommenter si besoin

// Routes de l'API
app.use('/api', apiRoutes);

// Middleware de gestion des erreurs (exemple simple)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Quelque chose a mal tourné!' });
});

module.exports = app;
