const { poolPromise } = require('../utils/db');

exports.createOrder = async (req, res) => {
    try {
        const { order_details } = req.body;
        const userId = req.user.id;
        const pool = await poolPromise;

        // Vérifier si l'article dans la commande appartient à l'utilisateur
        const articleIds = order_details.map(detail => detail.article_id);
        const articlesResult = await pool.request()
            .input('article_ids', articleIds.join(','))
            .query(`
                SELECT owner_id 
                FROM Articles 
                WHERE article_id IN (${articleIds.map(id => `'${id}'`).join(',')})
            `);
        
        const userOwnsArticle = articlesResult.recordset.some(article => article.owner_id === userId);

        if (userOwnsArticle) {
            return res.status(403).send({ message: 'Tu ne peux pas acheter ton propre article.' });
        }

        const result = await pool.request()
            .input('user_id', userId)
            .input('order_details', JSON.stringify(order_details))
            .query('INSERT INTO Orders (user_id, order_details) OUTPUT INSERTED.order_id VALUES (@user_id, @order_details)');

        res.status(201).send({ message: 'Order created successfully', order_id: result.recordset[0].order_id });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const pool = await poolPromise;

        const result = await pool.request()
            .input('user_id', userId)
            .query('SELECT * FROM Orders WHERE user_id = @user_id');

        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const pool = await poolPromise;

        const result = await pool.request()
            .input('order_id', orderId)
            .query('SELECT * FROM Orders WHERE order_id = @order_id');

        const order = result.recordset[0];
        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }

        res.json(order);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const pool = await poolPromise;

        await pool.request()
            .input('order_id', orderId)
            .input('status', status)
            .query('UPDATE Orders SET status = @status WHERE order_id = @order_id');

        res.send({ message: 'Order status updated successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
