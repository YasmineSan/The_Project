const selfsigned = require('selfsigned');
const fs = require('fs');

const attrs = [{ name: 'commonName', value: 'localhost' }];
const opts = { days: 365 };
const pems = selfsigned.generate(attrs, opts);

fs.writeFileSync('server.key', pems.private);
fs.writeFileSync('server.cert', pems.cert);

console.log('Certificates generated: server.key and server.cert');
