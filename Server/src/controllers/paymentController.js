const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { poolPromise } = require('../utils/db');

exports.createPaymentIntent = async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        res.status(201).send({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.handlePaymentSuccess = async (req, res) => {
    try {
        const { paymentIntentId, userId, articleIds } = req.body;
        const pool = await poolPromise;

        // Récupérer le Payment Intent depuis Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        // Log l'état du Payment Intent
        console.log('Payment Intent Status:', paymentIntent.status);

        // Vérifier l'état du Payment Intent
        if (paymentIntent.status === 'succeeded') {
            const transaction = await pool.transaction();
            try {
                await transaction.begin();

                // Insérer une nouvelle commande dans la table Orders
                const orderResult = await transaction.request()
                    .input('user_id', userId)
                    .query('INSERT INTO Orders (user_id, order_date, total_price) OUTPUT INSERTED.order_id VALUES (@user_id, GETDATE(), 0)');

                const orderId = orderResult.recordset[0].order_id;

                let totalPrice = 0;

                // Mettre à jour les tables Articles, User_Article, et Article_Order
                for (const articleId of articleIds) {
                    // Récupérer le prix de l'article avant de le supprimer
                    const articleResult = await transaction.request()
                        .input('article_id', articleId)
                        .query('SELECT article_price FROM Articles WHERE article_id = @article_id');

                    const articlePrice = articleResult.recordset[0].article_price;
                    totalPrice += articlePrice;

                    // Supprimer l'article de la table Articles
                    await transaction.request()
                        .input('article_id', articleId)
                        .query('DELETE FROM Articles WHERE article_id = @article_id');

                    // Supprimer la relation de l'article avec l'utilisateur dans User_Article
                    await transaction.request()
                        .input('article_id', articleId)
                        .input('user_id', userId)
                        .query('DELETE FROM User_Article WHERE article_id = @article_id AND user_id = @user_id');

                    // Ajouter l'article à la table de liaison Article_Order
                    await transaction.request()
                        .input('article_id', articleId)
                        .input('order_id', orderId)
                        .input('quantity', 1) // Supposons une quantité de 1 pour cet exemple
                        .query('INSERT INTO Article_Order (article_id, order_id, quantity) VALUES (@article_id, @order_id, @quantity)');
                }

                // Mettre à jour le prix total de la commande
                await transaction.request()
                    .input('order_id', orderId)
                    .input('total_price', totalPrice)
                    .query('UPDATE Orders SET total_price = @total_price WHERE order_id = @order_id');

                await transaction.commit();
                res.send({ message: 'Payment successful and order updated' });
            } catch (err) {
                await transaction.rollback();
                throw err;
            }
        } else {
            console.log('Payment Intent not successful:', paymentIntent);
            res.status(400).send({ message: 'Payment not successful' });
        }
    } catch (err) {
        console.error('Error handling payment success:', err);
        res.status(500).send({ message: err.message });
    }
};
