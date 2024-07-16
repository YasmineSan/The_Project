const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { pool } = require("./utils/db"); // Chemin mis à jour

dotenv.config();

const app = require("./app"); // Chemin mis à jour

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

// Test database connection
const startServer = async () => {
  try {
    const connection = await pool.getConnection(); // Utilisation correcte de pool pour MySQL
    console.log(`Successfully connected to the database`);
    connection.release(); // Libération de la connexion après le test

    // Serveur HTTPS démarré via start-https.js
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  }
};

startServer();

module.exports = app;
