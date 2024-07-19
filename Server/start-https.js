const fs = require('fs');
const path = require('path');
const https = require('https');
const app = require('./src/app'); // Correct path to app.js

// HTTPS options
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'selfsigned.key')),
  cert: fs.readFileSync(path.join(__dirname, 'selfsigned.crt')),
};

// Start the HTTPS server
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'; // Ensure the server listens on all network interfaces

https.createServer(httpsOptions, app).listen(PORT, HOST, () => {
  console.log(`HTTPS Server is running on https://${HOST}:${PORT}`);
});
