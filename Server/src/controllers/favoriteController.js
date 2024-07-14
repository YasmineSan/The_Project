const { pool } = require("../utils/db");

exports.addFavorite = async (req, res) => {
  try {
    const { articleId } = req.body;
    const userId = req.user.id;

    if (!articleId || !userId) {
      return res.status(400).send({ message: "Article ID and User ID are required" });
    }

    console.log("Adding favorite:", { articleId, userId });

    const connection = await pool.getConnection();

    try {
      const [articleResult] = await connection.execute(
        "SELECT user_id FROM User_Article WHERE article_id = ?",
        [articleId]
      );

      if (articleResult.length === 0) {
        return res.status(404).send({ message: "Article not found." });
      }

      if (articleResult[0].user_id === userId) {
        return res.status(403).send({
          message: "You cannot add your own article to favorites.",
        });
      }

      await connection.execute(
        "INSERT INTO Favorites (user_id, article_id) VALUES (?, ?)",
        [userId, articleId]
      );

      res.status(201).send({ message: "Favorite added successfully" });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error adding favorite:", err);
    res.status(500).send({ message: err.message });
  }
};

exports.getUserFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    console.log("Fetching favorites for user:", userId);

    const connection = await pool.getConnection();

    try {
      const [result] = await connection.execute(
        `
        SELECT a.*
        FROM Favorites f
        JOIN Articles a ON f.article_id = a.article_id
        WHERE f.user_id = ?
      `,
        [userId]
      );

      res.json(result);
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error fetching user favorites:", err);
    res.status(500).send({ message: err.message });
  }
};

exports.deleteFavorite = async (req, res) => {
  try {
    const { articleId } = req.params;
    const userId = req.user.id;

    if (!articleId || !userId) {
      return res.status(400).send({ message: "Article ID and User ID are required" });
    }

    console.log("Deleting favorite:", { articleId, userId });

    const connection = await pool.getConnection();

    try {
      await connection.execute(
        "DELETE FROM Favorites WHERE user_id = ? AND article_id = ?",
        [userId, articleId]
      );

      res.send({ message: "Favorite deleted successfully" });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error deleting favorite:", err);
    res.status(500).send({ message: err.message });
  }
};