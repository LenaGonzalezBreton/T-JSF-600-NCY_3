// src/controllers/channelController.js
const persistenceService = require('../services/persistenceService');

exports.getAllChannels = (req, res) => {
    try {
        const channels = persistenceService.getChannels();
        res.json(channels);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des canaux' });
    }
};
