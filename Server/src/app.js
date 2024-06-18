const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

// Serve HTML files
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'profile.html'));
});

app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1><a href="/login">Login</a> or <a href="/register">Register</a>');
});

module.exports = app;
