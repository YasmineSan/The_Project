const { poolPromise } = require('../utils/db');

exports.addToCart = async (req, res) => {
    try {
        const { articleId } = req.body;
        const userId = req.user.id;
        const pool = await poolPromise;

        await pool.request()
            .input('user_id', userId)
            .input('article_id', articleId)
            .query('INSERT INTO Cart (user_id, article_id) VALUES (@user_id, @article_id)');

        res.status(201).send({ message: 'Article added to cart successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getUserCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const pool = await poolPromise;

        const result = await pool.request()
            .input('user_id', userId)
            .query(`
                SELECT c.cart_id, c.quantity, c.added_at, 
                       a.article_id, a.title, a.article_photo, a.article_description, a.article_price, a.shipping_cost, a.category_name
                FROM Cart c
                JOIN Articles a ON c.article_id = a.article_id
                WHERE c.user_id = @user_id
            `);

        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};



exports.removeFromCart = async (req, res) => {
    try {
        const { articleId } = req.params;
        const userId = req.user.id;
        const pool = await poolPromise;

        await pool.request()
            .input('user_id', userId)
            .input('article_id', articleId)
            .query('DELETE FROM Cart WHERE user_id = @user_id AND article_id = @article_id');

        res.send({ message: 'Article removed from cart successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
