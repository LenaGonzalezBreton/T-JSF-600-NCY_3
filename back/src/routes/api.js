// src/routes/api.js
const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');

// Exemple d’endpoint pour récupérer la liste des canaux
router.get('/channels', channelController.getAllChannels);

module.exports = router;
