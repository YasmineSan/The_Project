const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { pool } = require("./utils/db");

dotenv.config();

const app = require("./app"); // Make sure this points to the correct app.js file

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

<<<<<<< HEAD
const PORT = process.env.PORT || 3002; // Use a different port to avoid conflicts
=======

const PORT = process.env.PORT || 3001;
>>>>>>> b5dd53f0a3c6f86bbb7f4221a602e216cda2a095

// Test database connection
app.listen(PORT, async () => {
  try {
    const connection = await pool.getConnection(); // Utilisation correcte de pool pour MySQL
    console.log(`Server is running on port ${PORT}`);
    connection.release(); // Libération de la connexion après le test
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  }
});

<<<<<<< HEAD
module.exports = app;


=======
module.exports = app;
>>>>>>> b5dd53f0a3c6f86bbb7f4221a602e216cda2a095
