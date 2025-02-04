// back/src/controllers/channelController.js
const Channel = require('../models/Channel');

// Liste tous les canaux
exports.getChannels = async (req, res) => {
    try {
        const channels = await Channel.findAll();
        res.status(200).json(channels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des canaux' });
    }
};

// Crée un nouveau canal
exports.createChannel = async (req, res) => {
    try {
        const { name } = req.body;
        const existingChannel = await Channel.findByName(name);
        if (existingChannel) {
            return res.status(400).json({ error: 'Un canal avec ce nom existe déjà.' });
        }
        const channel = await Channel.create(name);
        res.status(201).json(channel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création du canal' });
    }
};

// Renomme un canal
exports.renameChannel = async (req, res) => {
    try {
        const { id } = req.params;
        const { newName } = req.body;
        const updatedChannel = await Channel.update(id, newName);
        res.status(200).json(updatedChannel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la modification du canal' });
    }
};

// Supprime un canal
exports.deleteChannel = async (req, res) => {
    try {
        const { id } = req.params;
        await Channel.delete(id);
        res.status(200).json({ message: 'Canal supprimé' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression du canal' });
    }
};
