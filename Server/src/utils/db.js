const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Ajout de logs pour vérifier les variables d'environnement
console.log('DB_SERVER:', process.env.DB_SERVER);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_PORT:', process.env.DB_PORT);

const config = {
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10)
};

const poolPromise = mysql.createPool(config);

module.exports = {
    poolPromise
};
