const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: true, // True si SSL doit être utilisé
    trustServerCertificate: false, // Pour les environnements de production, utiliser true pour les certificats auto-signés
    cryptoCredentialsDetails: {
      minVersion: 'TLSv1.2' // Utilisez TLS v1.2 ou supérieur
    }
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => {
    console.error('Database Connection Failed! Bad Config: ', err);
    process.exit(1); // Arrêtez le serveur si la connexion à la base de données échoue
  });

module.exports = {
  sql, poolPromise
};
