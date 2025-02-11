const User = require('../models/User');

exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.params;           // L'ID de l'utilisateur à mettre à jour
        const updateData = req.body;          // Par exemple, { nickname, photo, ... }
        const updatedUser = await User.update(id, updateData);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du profil :", error);
        res.status(500).json({ error: "Erreur lors de la mise à jour du profil" });
    }
};
