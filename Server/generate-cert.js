const selfsigned = require('self-signed');
const fs = require('fs');
const path = require('path');

const pems = selfsigned.generate();

fs.writeFileSync(path.join(__dirname, 'selfsigned.key'), pems.private);
fs.writeFileSync(path.join(__dirname, 'selfsigned.crt'), pems.cert);
