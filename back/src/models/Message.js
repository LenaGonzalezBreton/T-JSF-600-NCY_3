// Importation de la bibliothèque mongoose
const mongoose = require('mongoose');

// Définition du schéma de message
const messageSchema = new mongoose.Schema({
    user: String, // Nom de l'utilisateur
    channel: String, // Nom du canal
    text: String, // Texte du message
    createdAt: { type: Date, default: Date.now } // Date de création du message, par défaut la date actuelle
});

// Création du modèle Message basé sur le schéma défini
const Message = mongoose.model('Message', messageSchema);

// Exportation du modèle pour l'utiliser dans d'autres fichiers
module.exports = Message;

