const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { pool } = require('./utils/db'); // Ensure correct path to db.js

dotenv.config();

const app = require('./app'); // Ensure correct path to app.js

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

// Test database connection and start server
const startServer = async () => {
  try {
    const connection = await pool.getConnection(); // Ensure correct usage of pool for MySQL
    console.log('Successfully connected to the database');
    connection.release(); // Release connection after test

    // Start the server after verifying database connection
    https.createServer({
      key: fs.readFileSync(path.join(__dirname, 'selfsigned.key')),
      cert: fs.readFileSync(path.join(__dirname, 'selfsigned.crt')),
    }, app).listen(PORT, '0.0.0.0', () => {
      console.log(`HTTPS Server is running on https://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  }
};

startServer();