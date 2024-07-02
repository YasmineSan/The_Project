const { poolPromise } = require('../utils/db');

exports.addFavorite = async (req, res) => {
    try {
        const { articleId } = req.body;
        const userId = req.user.id;
        const pool = await poolPromise;

        // Vérifier si l'article appartient à l'utilisateur
        const articleResult = await pool.request()
            .input('article_id', articleId)
            .query('SELECT owner_id FROM Articles WHERE article_id = @article_id');
        
        if (articleResult.recordset[0].owner_id === userId) {
            return res.status(403).send({ message: 'Tu ne peux pas ajouter ton propre article en favori.' });
        }

        await pool.request()
            .input('user_id', userId)
            .input('article_id', articleId)
            .query('INSERT INTO Favorites (user_id, article_id) VALUES (@user_id, @article_id)');

        res.status(201).send({ message: 'Favorite added successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getUserFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const pool = await poolPromise;

        // Jointure pour récupérer les détails des articles
        const result = await pool.request()
            .input('user_id', userId)
            .query(`
                SELECT a.*
                FROM Favorites f
                JOIN Articles a ON f.article_id = a.article_id
                WHERE f.user_id = @user_id
            `);

        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteFavorite = async (req, res) => {
    try {
        const { articleId } = req.params;
        const userId = req.user.id;
        const pool = await poolPromise;

        await pool.request()
            .input('user_id', userId)
            .input('article_id', articleId)
            .query('DELETE FROM Favorites WHERE user_id = @user_id AND article_id = @article_id');

        res.send({ message: 'Favorite deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
