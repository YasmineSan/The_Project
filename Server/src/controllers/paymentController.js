const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { pool } = require("../utils/db");

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.handlePaymentSuccess = async (req, res) => {
  try {
    const { paymentIntentId, userId, articleIds } = req.body;

    // Récupérer le Payment Intent depuis Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Log l'état du Payment Intent
    console.log("Payment Intent Status:", paymentIntent.status);

    // Vérifier l'état du Payment Intent
    if (paymentIntent.status === "succeeded") {
      const connection = await pool.getConnection();
      try {
        await connection.beginTransaction();

        // Insérer une nouvelle commande dans la table Orders
        const [orderResult] = await connection.execute(
          "INSERT INTO Orders (user_id, order_date, total_price) VALUES (?, NOW(), 0)",
          [userId]
        );

        const orderId = orderResult.insertId;

        let totalPrice = 0;

        // Mettre à jour les tables Articles, User_Article, et Article_Order
        for (const articleId of articleIds) {
          // Récupérer le prix de l'article avant de le supprimer
          const [articleResult] = await connection.execute(
            "SELECT article_price FROM Articles WHERE article_id = ?",
            [articleId]
          );

          const articlePrice = articleResult[0].article_price;
          totalPrice += articlePrice;

          // Supprimer l'article de la table Articles
          await connection.execute(
            "DELETE FROM Articles WHERE article_id = ?",
            [articleId]
          );

          // Supprimer la relation de l'article avec l'utilisateur dans User_Article
          await connection.execute(
            "DELETE FROM User_Article WHERE article_id = ? AND user_id = ?",
            [articleId, userId]
          );

          // Ajouter l'article à la table de liaison Article_Order
          await connection.execute(
            "INSERT INTO Article_Order (article_id, order_id, quantity) VALUES (?, ?, ?)",
            [articleId, orderId, 1] // Supposons une quantité de 1 pour cet exemple
          );
        }

        // Mettre à jour le prix total de la commande
        await connection.execute(
          "UPDATE Orders SET total_price = ? WHERE order_id = ?",
          [totalPrice, orderId]
        );

        await connection.commit();
        res.send({ message: "Payment successful and order updated" });
      } catch (err) {
        await connection.rollback();
        throw err;
      } finally {
        connection.release();
      }
    } else {
      console.log("Payment Intent not successful:", paymentIntent);
      res.status(400).send({ message: "Payment not successful" });
    }
  } catch (err) {
    console.error("Error handling payment success:", err);
    res.status(500).send({ message: err.message });
  }
};
