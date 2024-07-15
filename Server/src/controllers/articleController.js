const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../utils/db");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.DO_SPACES_ENDPOINT,
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

const isValidFileType = (file) => {
  const allowedTypes = [
    "image/webp",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg+xml",
  ];
  return allowedTypes.includes(file.mimetype);
};

exports.addArticle = async (req, res) => {
  try {
    const {
      title,
      article_description,
      article_price,
      shipping_cost,
      category_name
    } = req.body;
    const article_photo = req.file;
    const userId = req.user.id; // Assurez-vous que req.user.id contient l'ID de l'utilisateur

    if (article_photo && !isValidFileType(article_photo)) {
      return res.status(400).send({ message: 'Invalid file type' });
    }

    let article_photo_url = '';
    if (article_photo) {
      const key = `${uuidv4()}${path.extname(article_photo.originalname)}`;
      const command = new PutObjectCommand({
        Bucket: process.env.DO_SPACES_BUCKET,
        Key: key,
        Body: article_photo.buffer,
        ACL: 'public-read'
      });
      await s3.send(command);
      
      // Assure-toi que l'URL est correctement formée
      const endpoint = process.env.DO_SPACES_ENDPOINT.replace('https://', '');
      article_photo_url = `https://${process.env.DO_SPACES_BUCKET}.${endpoint}/${key}`;
    }

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      let [categoryResult] = await connection.execute(
        'SELECT category_id FROM Categories WHERE category_name = ?',
        [category_name]
      );

      let category_id;
      if (categoryResult.length > 0) {
        category_id = categoryResult[0].category_id;
      } else {
        const [newCategoryResult] = await connection.execute(
          'INSERT INTO Categories (category_name) VALUES (?)',
          [category_name]
        );
        category_id = newCategoryResult.insertId;
      }

      console.log('Category ID:', category_id); // Log category ID

      const [articleResult] = await connection.execute(
        `INSERT INTO Articles (
          title,
          article_description,
          article_price,
          shipping_cost,
          category_id,
          article_photo,
          date_added,
          user_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          title,
          article_description,
          article_price,
          shipping_cost,
          category_id,
          article_photo_url,
          new Date(),
          userId 
        ]
      );

      const article_id = articleResult.insertId;

      console.log('Article ID:', article_id); // Log article ID

      // Créer la liaison dans User_Article
      const [userArticleResult] = await connection.execute(
        'INSERT INTO User_Article (user_id, article_id) VALUES (?, ?)',
        [userId, article_id]
      );

      console.log('User_Article Result:', userArticleResult); // Log user-article insertion result

      await connection.commit();
      res.status(201).send({ message: 'Article added successfully' });
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send({ message: err.message });
  }
};




exports.getAllArticlesByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const connection = await pool.getConnection();

    try {
      const [result] = await connection.execute(
        `SELECT a.*
                FROM Articles a
                INNER JOIN User_Article ua ON a.article_id = ua.article_id
                WHERE ua.user_id = ?`,
        [userId],
      );
      res.json(result);
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    try {
      const [result] = await connection.execute(
        `SELECT a.*, u.profile_image as user_photo, u.user_id, u.username, u.biography, c.category_name
         FROM Articles a
         INNER JOIN User_Article ua ON a.article_id = ua.article_id
         INNER JOIN Users u ON ua.user_id = u.user_id
         LEFT JOIN Categories c ON a.category_id = c.category_id
         WHERE a.article_id = ?`,
        [id],
      );

      const article = result[0];
      if (!article) {
        return res.status(404).send({ message: "Article not found" });
      }

      res.json(article);
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.getAvailableArticles = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      const [result] = await connection.execute(
        `SELECT a.*, ua.user_id
         FROM Articles a
         LEFT JOIN User_Article ua ON a.article_id = ua.article_id
         WHERE a.sold IS NULL OR a.sold = 0`
      );
      res.json(result);
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.updateArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const {
      title,
      article_description,
      article_price,
      shipping_cost,
      category_name,
    } = req.body;
    const article_photo = req.file;
    const userId = req.user.id;

    const connection = await pool.getConnection();

    try {
      const [articleResult] = await connection.execute(
        "SELECT * FROM Articles a INNER JOIN User_Article ua ON a.article_id = ua.article_id WHERE a.article_id = ? AND ua.user_id = ?",
        [articleId, userId],
      );

      if (articleResult.length === 0) {
        return res
          .status(404)
          .send({ message: "Article not found or not owned by user" });
      }

      let article_photo_url = articleResult[0].article_photo;
      if (article_photo) {
        const key = `${uuidv4()}${path.extname(article_photo.originalname)}`;
        const command = new PutObjectCommand({
          Bucket: process.env.DO_SPACES_BUCKET,
          Key: key,
          Body: article_photo.buffer,
          ACL: "public-read",
        });
        await s3.send(command);

        // Assure-toi que l'URL est correctement formée
        const endpoint = process.env.DO_SPACES_ENDPOINT.replace('https://', '');
        article_photo_url = `https://${process.env.DO_SPACES_BUCKET}.${endpoint}/${key}`;
      }

      await connection.execute(
        `UPDATE Articles
                SET title = ?, article_description = ?, article_price = ?, shipping_cost = ?, category_name = ?, article_photo = ?
                WHERE article_id = ?`,
        [
          title,
          article_description,
          article_price,
          shipping_cost,
          category_name,
          article_photo_url,
          articleId,
        ],
      );

      res.send({ message: "Article updated successfully" });
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const connection = await pool.getConnection();

    try {
      const [articleResult] = await connection.execute(
        "SELECT * FROM Articles a INNER JOIN User_Article ua ON a.article_id = ua.article_id WHERE a.article_id = ? AND ua.user_id = ?",
        [id, userId],
      );

      if (articleResult.length === 0) {
        return res
          .status(404)
          .send({ message: "Article not found or not owned by user" });
      }

      // Supprimer les entrées dans User_Article
      await connection.execute(
        "DELETE FROM User_Article WHERE article_id = ?",
        [id],
      );

      // Supprimer l'article de la table Articles
      await connection.execute("DELETE FROM Articles WHERE article_id = ?", [
        id,
      ]);

      res.send({ message: "Article deleted successfully" });
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.getArticlesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const connection = await pool.getConnection();

    try {
      console.log('Fetching articles for user ID:', userId); // Log userId

      const [result] = await connection.execute(
        `SELECT a.*, u.profile_image as user_photo, u.user_id, c.category_name
         FROM Articles a
         INNER JOIN User_Article ua ON a.article_id = ua.article_id
         INNER JOIN Users u ON ua.user_id = u.user_id
         LEFT JOIN Categories c ON a.category_id = c.category_id
         WHERE ua.user_id = ? AND (a.sold IS NULL OR a.sold = 0)`,
        [userId],
      );

      console.log('Query result:', result); // Log the result

      if (result.length === 0) {
        return res
          .status(404)
          .send({ message: "No articles found for this user" });
      }

      res.json(result);
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error('Error:', err); // Log the error
    res.status(500).send({ message: err.message });
  }
};


exports.addEvaluation = async (req, res) => {
  try {
    const { id } = req.params;
    const { evaluation_number, evaluation_description } = req.body;
    const userId = req.user.id;

    const connection = await pool.getConnection();

    try {
      const result = await connection.execute(
        `INSERT INTO Evaluations (article_id, user_id, evaluation_number, evaluation_description)
                VALUES (?, ?, ?, ?)`,
        [id, userId, evaluation_number, evaluation_description],
      );

      res.status(201).send({ message: "Evaluation added successfully" });
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getEvaluations = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    try {
      const [result] = await connection.execute(
        "SELECT * FROM Evaluations WHERE article_id = ?",
        [id],
      );

      res.json(result);
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteEvaluation = async (req, res) => {
  try {
    const { articleId, evaluationId } = req.params;
    const userId = req.user.id;

    const connection = await pool.getConnection();

    try {
      await connection.execute(
        "DELETE FROM Evaluations WHERE article_id = ? AND evaluation_id = ? AND user_id = ?",
        [articleId, evaluationId, userId],
      );

      res.send({ message: "Évaluation supprimée avec succès" });
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getArticlePrice = async (req, res) => {
  try {
    const { id } = req.params; // Utilise 'id' ici

    // Ajout de logs pour diagnostiquer
    console.log("Params:", req.params);
    console.log("articleId:", id);

    if (!id) {
      return res.status(400).send({ message: "Article ID is required" });
    }

    const connection = await pool.getConnection();

    try {
      const [result] = await connection.execute(
        "SELECT article_price FROM Articles WHERE article_id = ?",
        [id], // Utilisation correcte du paramètre
      );

      const article = result[0];
      if (!article) {
        return res.status(404).send({ message: "Article not found" });
      }

      res.json({ article_id: id, price: article.article_price });
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};




exports.getAllArticlePrices = async (_req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      const [result] = await connection.execute(
        "SELECT article_id, article_price FROM Articles",
      );
      res.json(result);
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getCategoryArticlePrices = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const connection = await pool.getConnection();

    try {
      const [result] = await connection.execute(
        "SELECT article_id, article_price FROM Articles WHERE category_id = ?",
        [categoryId],
      );

      res.json(result);
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await pool.getConnection();

    try {
      const result = await connection.execute(
        "INSERT INTO Users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
      );

      res.status(201).send({ message: "User registered successfully" });
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const connection = await pool.getConnection();

    try {
      const [result] = await connection.execute(
        "SELECT * FROM Users WHERE username = ?",
        [username],
      );

      const user = result[0];
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get all articles (example definition, adjust as needed)
exports.getAllArticles = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        `SELECT a.*, c.category_name
         FROM Articles a
         LEFT JOIN Categories c ON a.category_id = c.category_id`
      );
      res.json(result);
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// Get all evaluations by user (example definition, adjust as needed)
exports.getAllEvaluationsByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        "SELECT * FROM Evaluations WHERE user_id = ?",
        [userId],
      );
      res.json(result);
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
