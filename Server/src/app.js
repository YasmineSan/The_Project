const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors'); // Ajout de l'importation du package cors
const app = express();
const upload = require('./middleware/uploadImage'); // Importer le middleware d'upload

// Middleware pour sécuriser les en-têtes HTTP
app.use(helmet());

// Middleware pour gérer les CORS
app.use(cors({
  origin: 'http://localhost:5173' // Remplace par l'origine de ton frontend
}));

// Middleware pour limiter le nombre de requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limite chaque IP à 100 requêtes par fenêtre de 15 minutes
});

app.use(limiter);

// Middleware pour parser les requêtes JSON et URL-encoded
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
