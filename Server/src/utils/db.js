const mysql = require('mysql2');
const dotenv = require('dotenv');

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    //port: 3306
});


/*connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connexion à la base de données MySQL établie avec succès !');

    // Les données à insérer
    const utilisateurs = {
        nom: "Hello",
        email: "hello@gmail.com"
    };

    // Requête SQL pour insérer les données
    const sql = 'INSERT INTO utilisateurs SET ?';

    // Exécuter la requête
    connection.query(sql, utilisateurs, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion des données :", err);
            return;
        }
        console.log('Données insérées avec succès, ID:', result.insertId);

        // Fermer la connexion
        connection.end((err) => {
            if (err) {
                console.error('Erreur lors de la déconnexion de la base de données :', err);
                return;
            }
            console.log('Déconnexion de la base de données MySQL réussie.');
        });
    });
});*/

module.exports = connection;
