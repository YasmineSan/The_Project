const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { pool } = require('./utils/db');

dotenv.config();

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3001;

// Test database connection
app.listen(PORT, async () => {
  try {
    const connection = await pool.getConnection(); // Utilisation correcte de pool pour MySQL
    console.log(`Server is running on port ${PORT}`);
    connection.release(); // Libération de la connexion après le test
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  }
});

module.exports = app;