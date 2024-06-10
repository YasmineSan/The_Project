const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Chemin correct pour userController.js dans le dossier controllers

// Exemple de route pour obtenir tous les utilisateurs
router.get('/', userController.getAllUsers);

module.exports = router;
