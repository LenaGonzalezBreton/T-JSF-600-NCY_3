// back/src/routes/channelRoutes.js
const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');

// Endpoint pour récupérer la liste des canaux
router.get('/channels', channelController.getChannels);

// Endpoint pour créer un canal
router.post('/channels', channelController.createChannel);

// Endpoint pour renommer un canal
router.put('/channels/:id', channelController.renameChannel);

// Endpoint pour supprimer un canal
router.delete('/channels/:id', channelController.deleteChannel);

module.exports = router;
