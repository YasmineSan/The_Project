const app = require('./app');
const dotenv = require('dotenv');
const fs = require('fs');
const https = require('https');
const { poolPromise } = require('./utils/db');

dotenv.config();

const PORT = process.env.PORT || 3001;

// Charger les certificats SSL
const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, async () => {
  try {
    await poolPromise;
    console.log(`HTTPS Server running on port ${PORT}`);
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  }
});
