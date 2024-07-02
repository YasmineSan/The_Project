const { poolPromise } = require('../utils/db');

exports.createOrder = async (req, res) => {
    try {
        const { order_details } = req.body;
        const userId = req.user.id;
        const pool = await poolPromise;

        const articleIds = order_details.map(detail => detail.article_id);

        // Récupérer les détails des articles pour calculer le prix total et obtenir les informations des articles
        const articlesResult = await pool.request()
            .query(`
                SELECT article_id, title, article_description, article_price, shipping_cost
                FROM Articles 
                WHERE article_id IN (${articleIds.map(id => `'${id}'`).join(',')})
            `);
        
        let totalPrice = 0;
        let detailedArticles = [];
        articlesResult.recordset.forEach(article => {
            const quantity = order_details.find(detail => detail.article_id === article.article_id).quantity;
            totalPrice += (article.article_price + (article.shipping_cost || 0)) * quantity;

            detailedArticles.push({
                article_id: article.article_id,
                title: article.title,
                description: article.article_description,
                price: article.article_price,
                shipping_cost: article.shipping_cost,
                quantity: quantity
            });
        });

        // Créer la commande avec les détails des articles
        const result = await pool.request()
            .input('user_id', userId)
            .input('total_price', totalPrice)
            .input('article_details', JSON.stringify(detailedArticles))
            .query('INSERT INTO Orders (user_id, total_price, article_details) OUTPUT INSERTED.order_id VALUES (@user_id, @total_price, @article_details)');
        
        const orderId = result.recordset[0].order_id;

        // Marquer les articles comme vendus
        await pool.request()
            .query(`
                UPDATE Articles 
                SET sold = 1 
                WHERE article_id IN (${articleIds.map(id => `'${id}'`).join(',')})
            `);

        // Supprimer les articles des autres tables liées
        await pool.request()
            .query(`
                DELETE FROM User_Article WHERE article_id IN (${articleIds.map(id => `'${id}'`).join(',')});
                DELETE FROM Favorites WHERE article_id IN (${articleIds.map(id => `'${id}'`).join(',')});
                DELETE FROM Cart WHERE article_id IN (${articleIds.map(id => `'${id}'`).join(',')});
            `);

        res.status(201).send({ message: 'Order created successfully', order_id: orderId });
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
