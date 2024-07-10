const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/sendConfirmationEmail', emailController.sendConfirmationEmail);

module.exports = router;
