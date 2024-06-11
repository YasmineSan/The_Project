const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const authenticateToken = require('../middleware/authenticateToken'); // Importer le middleware

// Configure multer pour le stockage en mémoire
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
router.get('/', userController.getAllUsers);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Utilisez le middleware d'authentification pour protéger ces routes
router.get('/dashboard', authenticateToken, userController.getUserInfo);
router.post('/update', authenticateToken, upload.single('profile_image'), userController.updateUser);

module.exports = router;
