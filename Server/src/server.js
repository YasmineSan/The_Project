const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

// Middleware pour sécuriser les en-têtes HTTP
app.use(helmet());

// Middleware pour gérer les CORS
app.use(cors({
  origin: 'http://localhost:5173' // Remplace par l'origine de ton frontend
}));

// Middleware pour parser les requêtes JSON et URL-encoded
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middleware to capture raw request body
app.use(bodyParser.json({
  limit: '5mb',
  verify: (req, _res, buf) => {
      req.rawBody = buf.toString();
  }
}));

// Importer et utiliser les routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/articles', require('./routes/articleRoutes'));

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

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
