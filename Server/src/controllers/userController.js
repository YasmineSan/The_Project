const { poolPromise } = require('../utils/db'); // Chemin correct pour db.js dans le dossier utils

exports.getAllUsers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Users');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
