const { poolPromise } = require('../utils/db');

exports.createOrder = async (req, res) => {
    try {
        const { order_details } = req.body;
        const userId = req.user.id;
        console.log('userId:', userId); // Vérifier que userId est défini
        const pool = await poolPromise;

        if (!userId) {
            return res.status(400).send({ message: 'User ID not found in request' });
        }

        const articleIds = order_details.map(detail => detail.article_id);
        console.log('articleIds:', articleIds); // Vérifier les articleIds

        const articlesQuery = `
            SELECT article_id, title, article_description, article_price, shipping_cost, article_photo, user_id AS seller_id
            FROM Articles 
            WHERE article_id IN (${articleIds.map(id => `'${id}'`).join(',')})
        `;
        console.log('articlesQuery:', articlesQuery); // Vérifier la requête SQL

        const articlesResult = await pool.request().query(articlesQuery);
        console.log('articlesResult:', articlesResult); // Vérifier le résultat de la requête

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
                quantity: quantity,
                article_photo: article.article_photo,
                seller_id: article.seller_id  // Inclure l'id du vendeur
            });
        });

        console.log('detailedArticles:', detailedArticles); // Vérifier les articles détaillés

        const insertQuery = `
            INSERT INTO Orders (user_id, total_price, article_details)
            OUTPUT INSERTED.order_id
            VALUES (@user_id, @total_price, @article_details)
        `;
        console.log('insertQuery:', insertQuery); // Vérifier la requête d'insertion

        const result = await pool.request()
            .input('user_id', userId)
            .input('total_price', totalPrice)
            .input('article_details', JSON.stringify(detailedArticles))
            .query(insertQuery);

        const orderId = result.recordset[0].order_id;
        console.log('orderId:', orderId); // Vérifier l'orderId

        const updateQuery = `
            UPDATE Articles 
            SET sold = 1 
            WHERE article_id IN (${articleIds.map(id => `'${id}'`).join(',')})
        `;
        console.log('updateQuery:', updateQuery); // Vérifier la requête de mise à jour

        await pool.request().query(updateQuery);

        const deleteQueries = `
            DELETE FROM User_Article WHERE article_id IN (${articleIds.map(id => `'${id}'`).join(',')});
            DELETE FROM Favorites WHERE article_id IN (${articleIds.map(id => `'${id}'`).join(',')});
            DELETE FROM Cart WHERE article_id IN (${articleIds.map(id => `'${id}'`).join(',')});
        `;
        console.log('deleteQueries:', deleteQueries); // Vérifier les requêtes de suppression

        await pool.request().query(deleteQueries);

        res.status(201).send({ message: 'Order created successfully', order_id: orderId });
    } catch (err) {
        console.error('Error:', err); // Vérifier l'erreur complète
        res.status(500).send({ message: err.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const pool = await poolPromise;

        const result = await pool.request()
            .input('user_id', userId)
            .query(`
                SELECT o.*, u.username, u.email, u.first_name, u.last_name, u.street, u.street_number, u.apartment, u.postal_code, u.city
                FROM Orders o
                JOIN Users u ON o.user_id = u.user_id
                WHERE o.user_id = @user_id
            `);

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
            .query(`
                SELECT o.*, u.username, u.email, u.first_name, u.last_name, u.street, u.street_number, u.apartment, u.postal_code, u.city
                FROM Orders o
                JOIN Users u ON o.user_id = u.user_id
                WHERE o.order_id = @order_id
            `);

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
