const { poolPromise } = require('../utils/db');

exports.addFavorite = async (req, res) => {
    try {
        const { articleId } = req.body;
        const userId = req.user.id;
        const pool = await poolPromise;

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

        const result = await pool.request()
            .input('user_id', userId)
            .query('SELECT * FROM Favorites WHERE user_id = @user_id');

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
