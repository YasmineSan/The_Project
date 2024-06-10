const app = require('./app'); // Chemin correct pour app.js dans le même dossier
const dotenv = require('dotenv');
const { poolPromise } = require('./utils/db'); // Chemin mis à jour pour db.js dans le dossier utils

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await poolPromise; // Assure-toi que la connexion à la base de données est établie avant de démarrer le serveur
        console.log(`Server is running on port ${PORT}`);
    } catch (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    }
});
