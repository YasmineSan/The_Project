const express = require('express');
const app = express();

// Middleware et routes
app.use(express.json());
app.use('/api/users', require('./routes/userRoutes')); // Chemin correct pour userRoutes.js dans le dossier routes

module.exports = app;
