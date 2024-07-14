const { pool } = require("../utils/db");

exports.addCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    // Vérification si category_name est fourni
    if (!category_name) {
      return res
        .status(400)
        .send({ message: "Le nom de la catégorie est requis." });
    }

    const connection = await pool.getConnection();

    try {
      const [result] = await connection.execute(
        "INSERT INTO Categories (category_name) VALUES (?)",
        [category_name]
      );

      // Vérification si l'insertion a réussi et si le résultat contient l'ID inséré
      if (result.affectedRows > 0) {
        res.status(201).send({
          message: "Catégorie ajoutée avec succès",
          category_id: result.insertId,
        });
      } else {
        res.status(500).send({ message: "Échec de l'ajout de la catégorie" });
      }
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute('SELECT * FROM Categories');
      res.json(rows);
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { category_name } = req.body;
    const pool = await poolPromise;

    await pool
      .request()
      .input("category_id", categoryId)
      .input("category_name", category_name)
      .query(
        "UPDATE Categories SET category_name = @category_name WHERE category_id = @category_id",
      );

    res.send({ message: "Category updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const pool = await poolPromise;

    await pool
      .request()
      .input("category_id", categoryId)
      .query("DELETE FROM Categories WHERE category_id = @category_id");

    res.send({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
