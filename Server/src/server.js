const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { poolPromise } = require('./utils/db');

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

// Test database connection
app.listen(PORT, async () => {
  try {
    await poolPromise;
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  }
});

// Tes routes ici
