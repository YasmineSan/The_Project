const { pool } = require("../utils/db");


exports.addToCart = async (req, res) => {
  try {
    const { articleId } = req.body;
    const userId = req.user.id;

    // Validation des données d'entrée
    if (!articleId) {
      return res.status(400).send({ message: 'Article ID is required.' });
    }
    if (!userId) {
      return res.status(400).send({ message: 'User ID is required.' });
    }

    const connection = await pool.getConnection();

    try {
      // Vérifiez si l'article existe et appartient à un utilisateur différent
      const [articleResult] = await connection.execute(
        'SELECT user_id FROM User_Article WHERE article_id = ?',
        [articleId]
      );

      if (articleResult.length === 0) {
        return res.status(404).send({ message: 'Article not found.' });
      }

      if (articleResult[0].user_id === userId) {
        return res.status(403).send({
          message: 'You cannot add your own article to the cart.',
        });
      }

      // Ajouter l'article au panier
      await connection.execute(
        'INSERT INTO Cart (user_id, article_id) VALUES (?, ?)',
        [userId, articleId]
      );

      res.status(201).send({ message: 'Article added to cart successfully' });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).send({ message: err.message });
  }
};


exports.getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const connection = await pool.getConnection();

    try {
      const [result] = await connection.execute(
        `
        SELECT c.cart_id, c.quantity, c.added_at, 
               a.article_id, a.title, a.article_photo, a.article_description, a.article_price, a.shipping_cost, a.category_name
        FROM Cart c
        JOIN Articles a ON c.article_id = a.article_id
        WHERE c.user_id = ?
      `,
        [userId],
      );

      res.json(result);
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error fetching user cart:", err);
    res.status(500).send({ message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { articleId } = req.params;
    const userId = req.user.id;
    const connection = await pool.getConnection();

    try {
      await connection.execute(
        "DELETE FROM Cart WHERE user_id = ? AND article_id = ?",
        [userId, articleId],
      );

      res.send({ message: "Article removed from cart successfully" });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).send({ message: err.message });
  }
};
