const selfsigned = require('selfsigned');
const fs = require('fs');
const path = require('path');

// Définir les attributs pour le certificat
const attrs = [{ name: 'commonName', value: 'localhost' }];

// Générer le certificat avec une clé de 2048 bits
const pems = selfsigned.generate(attrs, {
  keySize: 2048, // Taille de la clé en bits
  days: 365, // Durée de validité du certificat
});

// Écrire les clés générées dans des fichiers
fs.writeFileSync(path.join(__dirname, 'selfsigned.key'), pems.private);
fs.writeFileSync(path.join(__dirname, 'selfsigned.crt'), pems.cert);

console.log('Certificat auto-signé généré avec succès');
