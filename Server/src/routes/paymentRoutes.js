const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const authenticateToken = require("../middleware/authenticateToken");

// Routes pour la gestion des paiements
router.post(
  "/create-payment-intent",
  authenticateToken,
  paymentController.createPaymentIntent,
);
router.post(
  "/payment-success",
  authenticateToken,
  paymentController.handlePaymentSuccess,
);

module.exports = router;
