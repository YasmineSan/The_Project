const { poolPromise } = require("../utils/db");

// Obtenir toutes les évaluations
exports.getAllEvaluations = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Evaluations");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une évaluation par ID
exports.getEvaluationById = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM Evaluations WHERE evaluation_id = @id");
    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]);
    } else {
      res.status(404).json({ message: "Évaluation non trouvée" });
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
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("evaluation_number", evaluation_number)
      .input("evaluation_description", evaluation_description)
      .input("user_id", user_id)
      .input("commented_user_id", commented_user_id)
      .query(
        "INSERT INTO Evaluations (evaluation_number, evaluation_description, user_id, commented_user_id) VALUES (@evaluation_number, @evaluation_description, @user_id, @commented_user_id)",
      );
    res.status(201).json(result.recordset);
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
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", req.params.id)
      .input("evaluation_number", evaluation_number)
      .input("evaluation_description", evaluation_description)
      .input("user_id", user_id)
      .input("commented_user_id", commented_user_id)
      .query(
        "UPDATE Evaluations SET evaluation_number = @evaluation_number, evaluation_description = @evaluation_description, user_id = @user_id, commented_user_id = @commented_user_id WHERE evaluation_id = @id",
      );
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une évaluation
exports.deleteEvaluation = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("DELETE FROM Evaluations WHERE evaluation_id = @id");
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
