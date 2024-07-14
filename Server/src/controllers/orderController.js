const { pool } = require("../utils/db");

exports.createOrder = async (req, res) => {
  try {
    const { order_details } = req.body;
    const userId = req.user.id;

    const connection = await pool.getConnection();

    try {
      if (!userId) {
        return res
          .status(400)
          .send({ message: "User ID not found in request" });
      }

      const articleIds = order_details.map((detail) => detail.article_id);

      const articlesQuery = `
        SELECT article_id, title, article_description, article_price, shipping_cost, article_photo, user_id AS seller_id
        FROM Articles 
        WHERE article_id IN (${articleIds.map((id) => `'${id}'`).join(",")})
      `;

      const [articlesResult] = await connection.execute(articlesQuery);

      let totalPrice = 0;
      let detailedArticles = [];
      articlesResult.forEach((article) => {
        const quantity = order_details.find(
          (detail) => detail.article_id === article.article_id,
        ).quantity;
        totalPrice +=
          (article.article_price + (article.shipping_cost || 0)) * quantity;

        detailedArticles.push({
          article_id: article.article_id,
          title: article.title,
          description: article.article_description,
          price: article.article_price,
          shipping_cost: article.shipping_cost,
          quantity: quantity,
          article_photo: article.article_photo,
          seller_id: article.seller_id,
        });
      });

      const insertQuery = `
        INSERT INTO Orders (user_id, total_price, article_details)
        VALUES (?, ?, ?)
      `;

      const [result] = await connection.execute(insertQuery, [
        userId,
        totalPrice,
        JSON.stringify(detailedArticles),
      ]);

      const orderId = result.insertId;

      const updateQuery = `
        UPDATE Articles 
        SET sold = 1 
        WHERE article_id IN (${articleIds.map((id) => `'${id}'`).join(",")})
      `;

      await connection.execute(updateQuery);

      // Séparer les requêtes DELETE
      const deleteUserArticleQuery = `
        DELETE FROM User_Article WHERE article_id IN (${articleIds.map((id) => `'${id}'`).join(",")})
      `;
      const deleteFavoritesQuery = `
        DELETE FROM Favorites WHERE article_id IN (${articleIds.map((id) => `'${id}'`).join(",")})
      `;
      const deleteCartQuery = `
        DELETE FROM Cart WHERE article_id IN (${articleIds.map((id) => `'${id}'`).join(",")})
      `;

      await connection.execute(deleteUserArticleQuery);
      await connection.execute(deleteFavoritesQuery);
      await connection.execute(deleteCartQuery);

      res
        .status(201)
        .send({ message: "Order created successfully", order_id: orderId });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).send({ message: err.message });
  }
};


// Fetch user orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const connection = await pool.getConnection();

    try {
      const [result] = await connection.execute(
        `
        SELECT o.*, u.username, u.email, u.first_name, u.last_name, u.street, u.street_number, u.apartment, u.postal_code, u.city
        FROM Orders o
        JOIN Users u ON o.user_id = u.user_id
        WHERE o.user_id = ?
      `,
        [userId],
      );

      res.json(result);
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).send({ message: err.message });
  }
};

// Fetch order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const connection = await pool.getConnection();

    try {
      const [result] = await connection.execute(
        `
        SELECT o.*, u.username, u.email, u.first_name, u.last_name, u.street, u.street_number, u.apartment, u.postal_code, u.city
        FROM Orders o
        JOIN Users u ON o.user_id = u.user_id
        WHERE o.order_id = ?
      `,
        [orderId],
      );

      const order = result[0];
      if (!order) {
        return res.status(404).send({ message: "Order not found" });
      }

      res.json(order);
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error fetching order by ID:", err);
    res.status(500).send({ message: err.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const connection = await pool.getConnection();

    try {
      await connection.execute(
        "UPDATE Orders SET status = ? WHERE order_id = ?",
        [status, orderId],
      );

      res.send({ message: "Order status updated successfully" });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).send({ message: err.message });
  }
};
