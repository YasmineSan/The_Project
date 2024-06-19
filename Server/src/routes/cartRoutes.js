const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticateToken = require('../middleware/authenticateToken');

// Routes pour la gestion des paniers
router.post('/', authenticateToken, cartController.addToCart);
router.get('/user', authenticateToken, cartController.getUserCart);
router.delete('/:articleId', authenticateToken, cartController.removeFromCart);

module.exports = router;
