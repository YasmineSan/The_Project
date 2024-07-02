const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateToken = require('../middleware/authenticateToken');

// Routes pour la gestion des commandes
router.post('/', authenticateToken, orderController.createOrder);
router.get('/user', authenticateToken, orderController.getUserOrders);
router.get('/:orderId', authenticateToken, orderController.getOrderById);
router.put('/:orderId/status', authenticateToken, orderController.updateOrderStatus);

module.exports = router;