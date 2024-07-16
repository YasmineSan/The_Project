const fs = require('fs');
const path = require('path');
const https = require('https');
const app = require('./src/app'); // Chemin correct vers app.js

// Options pour HTTPS
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'selfsigned.key')),
  cert: fs.readFileSync(path.join(__dirname, 'selfsigned.crt')),
};

// Démarrer le serveur HTTPS
const PORT = process.env.PORT || 3001;
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`HTTPS Server is running on port ${PORT}`);
});
