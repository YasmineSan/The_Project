const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Route par défaut
app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur API');
});

module.exports = app;
