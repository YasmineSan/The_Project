const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const fs = require("fs");
const https = require("https");
const { pool } = require("./src/utils/db");

dotenv.config();

const app = require("./src/app"); // Assurez-vous que ce chemin est correct

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3002; // Utilisez un autre port pour éviter les conflits

// Chemins des certificats
const httpsOptions = {
  key: fs.readFileSync("/etc/letsencrypt/live/ecommerce-craftify.netlify.app/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/ecommerce-craftify.netlify.app/cert.pem"),
  ca: fs.readFileSync("/etc/letsencrypt/live/ecommerce-craftify.netlify.app/chain.pem"),
};

// Test database connection
const startServer = async () => {
  try {
    const connection = await pool.getConnection(); // Utilisation correcte de pool pour MySQL
    console.log(`Successfully connected to the database`);
    connection.release(); // Libération de la connexion après le test

    https.createServer(httpsOptions, app).listen(PORT, () => {
      console.log(`HTTPS Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  }
};

startServer();

module.exports = app;
