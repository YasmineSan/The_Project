const { pool } = require("../utils/db");

// Obtenir toutes les évaluations
exports.getAllEvaluations = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute("SELECT * FROM Evaluations");
      res.status(200).json(rows);
    } finally {
      connection.release();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une évaluation par ID
exports.getEvaluationById = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        "SELECT * FROM Evaluations WHERE evaluation_id = ?",
        [req.params.id]
      );
      if (rows.length > 0) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).json({ message: "Évaluation non trouvée" });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle évaluation
exports.createEvaluation = async (req, res) => {
  try {
    const {
      evaluation_number,
      evaluation_description,
      user_id,
      commented_user_id,
    } = req.body;
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        "INSERT INTO Evaluations (evaluation_number, evaluation_description, user_id, commented_user_id) VALUES (?, ?, ?, ?)",
        [evaluation_number, evaluation_description, user_id, commented_user_id]
      );
      res.status(201).json({ message: "Évaluation créée avec succès" });
    } finally {
      connection.release();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une évaluation
exports.updateEvaluation = async (req, res) => {
  try {
    const {
      evaluation_number,
      evaluation_description,
      user_id,
      commented_user_id,
    } = req.body;
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        "UPDATE Evaluations SET evaluation_number = ?, evaluation_description = ?, user_id = ?, commented_user_id = ? WHERE evaluation_id = ?",
        [
          evaluation_number,
          evaluation_description,
          user_id,
          commented_user_id,
          req.params.id,
        ]
      );
      res.status(200).json({ message: "Évaluation mise à jour avec succès" });
    } finally {
      connection.release();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une évaluation
exports.deleteEvaluation = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        "DELETE FROM Evaluations WHERE evaluation_id = ?",
        [req.params.id]
      );
      res.status(204).json();
    } finally {
      connection.release();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
