const http = require('http');
const app = require('./src/app'); // Ensure correct path to app.js

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'; // Ensure the server listens on all network interfaces

http.createServer(app).listen(PORT, HOST, () => {
  console.log(`HTTP Server is running on http://${HOST}:${PORT}`);
});