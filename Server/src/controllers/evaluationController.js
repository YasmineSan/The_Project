const sql = require('mssql');

// Ajouter une nouvelle évaluation
exports.addEvaluation = async (req, res) => {
    const { evaluation_number, evaluation_description, user_id, article_id, commented_user_id } = req.body;
    const loggedInUserId = req.user.id;  // Supposons que l'ID de l'utilisateur connecté est stocké dans req.user.id

    if (loggedInUserId === commented_user_id) {
        return res.status(400).send({ message: 'You cannot evaluate your own profile' });
    }

    try {
        const pool = await sql.connect(/* config */);
        const result = await pool.request()
            .input('evaluation_number', sql.Int, evaluation_number)
            .input('evaluation_description', sql.NVarChar, evaluation_description)
            .input('user_id', sql.Int, loggedInUserId)  // Utilisateur connecté qui fait le commentaire
            .input('article_id', sql.Int, article_id)
            .input('commented_user_id', sql.Int, commented_user_id)
            .input('date_added', sql.DateTime, new Date())
            .query('INSERT INTO Evaluations (evaluation_number, evaluation_description, user_id, article_id, commented_user_id, date_added) OUTPUT INSERTED.evaluation_id VALUES (@evaluation_number, @evaluation_description, @user_id, @article_id, @commented_user_id, @date_added)');
        
        res.json({ evaluation_id: result.recordset[0].evaluation_id, message: 'Evaluation added successfully' });
    } catch (err) {
        console.error('Error adding evaluation:', err);
        res.status(500).send({ message: err.message });
    }
};
