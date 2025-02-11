// back/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Endpoint pour mettre à jour le profil utilisateur
// Par exemple, une requête PUT à http://localhost:5000/users/:id
router.put('/:id', userController.updateProfile);

module.exports = router;
