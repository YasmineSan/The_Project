const { poolPromise } = require('../utils/db');
const { BlobServiceClient } = require('@azure/storage-blob');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const isValidFileType = (file) => {
    const allowedTypes = ['image/webp', 'image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
    return allowedTypes.includes(file.mimetype);
};

exports.addArticle = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Ajoute cette ligne pour log le corps de la requête
        console.log('File:', req.file); // Ajoute cette ligne pour log le fichier uploadé
        const { article_description, article_price, shipping_cost, category_name } = req.body;
        const article_photo = req.file;
        const userId = req.user.id;

        if (article_photo && !isValidFileType(article_photo)) {
            return res.status(400).send({ message: 'Invalid file type' });
        }

        const pool = await poolPromise;

        let article_photo_url = '';
        if (article_photo) {
            const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
            const containerClient = blobServiceClient.getContainerClient('article-images');
            const blobName = uuidv4() + path.extname(article_photo.originalname);
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadData(article_photo.buffer);
            article_photo_url = blockBlobClient.url;
        }

        const categoryResult = await pool.request()
            .input('category_name', category_name)
            .query('SELECT category_id FROM Categories WHERE category_name = @category_name');

        let category_id;
        if (categoryResult.recordset.length > 0) {
            category_id = categoryResult.recordset[0].category_id;
        } else {
            const newCategoryResult = await pool.request()
                .input('category_name', category_name)
                .query('INSERT INTO Categories (category_name) OUTPUT INSERTED.category_id VALUES (@category_name)');
            category_id = newCategoryResult.recordset[0].category_id;
        }

        const articleResult = await pool.request()
            .input('article_description', article_description)
            .input('article_price', article_price)
            .input('shipping_cost', shipping_cost)
            .input('category_id', category_id)
            .input('article_photo', article_photo_url)
            .query(`
                INSERT INTO Articles (
                    article_description,
                    article_price,
                    shipping_cost,
                    category_id,
                    article_photo
                ) OUTPUT INSERTED.article_id VALUES (
                    @article_description,
                    @article_price,
                    @shipping_cost,
                    @category_id,
                    @article_photo
                )
            `);

        const article_id = articleResult.recordset[0].article_id;

        await pool.request()
            .input('user_id', userId)
            .input('article_id', article_id)
            .query('INSERT INTO User_Article (user_id, article_id) VALUES (@user_id, @article_id)');

        res.status(201).send({ message: 'Article added successfully' });
    } catch (err) {
        console.error('Error:', err); // Ajoute cette ligne pour log l'erreur
        res.status(500).send({ message: err.message });
    }
};




exports.getAllArticlesByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('user_id', userId)
            .query(`
                SELECT a.*
                FROM Articles a
                INNER JOIN User_Article ua ON a.article_id = ua.article_id
                WHERE ua.user_id = @user_id
            `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const { articleId } = req.params;
        const { article_description, article_price, shipping_cost, category_name } = req.body;
        const article_photo = req.file;
        const userId = req.user.id;

        const pool = await poolPromise;

        // Vérifie si l'article appartient à l'utilisateur
        const articleResult = await pool.request()
            .input('article_id', articleId)
            .input('user_id', userId)
            .query('SELECT * FROM Articles a INNER JOIN User_Article ua ON a.article_id = ua.article_id WHERE a.article_id = @article_id AND ua.user_id = @user_id');

        if (articleResult.recordset.length === 0) {
            return res.status(404).send({ message: 'Article not found or not owned by user' });
        }

        let article_photo_url = articleResult.recordset[0].article_photo;
        if (article_photo) {
            const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
            const containerClient = blobServiceClient.getContainerClient('article-images');
            const blobName = uuidv4() + path.extname(article_photo.originalname);
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadData(article_photo.buffer);
            article_photo_url = blockBlobClient.url;
        }

        await pool.request()
            .input('article_id', articleId)
            .input('article_description', article_description)
            .input('article_price', article_price)
            .input('shipping_cost', shipping_cost)
            .input('category_name', category_name)
            .input('article_photo', article_photo_url)
            .query(`
                UPDATE Articles
                SET article_description = @article_description,
                    article_price = @article_price,
                    shipping_cost = @shipping_cost,
                    category_name = @category_name,
                    article_photo = @article_photo
                WHERE article_id = @article_id
            `);

        res.send({ message: 'Article updated successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const pool = await poolPromise;

        // Vérifie si l'article appartient à l'utilisateur
        const articleResult = await pool.request()
            .input('article_id', id)
            .input('user_id', userId)
            .query('SELECT * FROM Articles a INNER JOIN User_Article ua ON a.article_id = ua.article_id WHERE a.article_id = @article_id AND ua.user_id = @user_id');

        if (articleResult.recordset.length === 0) {
            return res.status(404).send({ message: 'Article not found or not owned by user' });
        }

        await pool.request()
            .input('article_id', id)
            .query('DELETE FROM Articles WHERE article_id = @article_id');

        res.send({ message: 'Article deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;

        const result = await pool.request()
            .input('article_id', id)
            .query('SELECT * FROM Articles WHERE article_id = @article_id');

        const article = result.recordset[0];
        if (!article) {
            return res.status(404).send({ message: 'Article not found' });
        }

        res.json(article);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.addEvaluation = async (req, res) => {
    try {
        const { id } = req.params;
        const { evaluation_number, evaluation_description } = req.body;
        const userId = req.user.id;

        const pool = await poolPromise;

        console.log("Received data:", {
            article_id: id,
            user_id: userId,
            evaluation_number,
            evaluation_description
        });

        const result = await pool.request()
            .input('article_id', id)
            .input('user_id', userId)
            .input('evaluation_number', evaluation_number)
            .input('evaluation_description', evaluation_description)
            .query(`
                INSERT INTO Evaluations (article_id, user_id, evaluation_number, evaluation_description)
                VALUES (@article_id, @user_id, @evaluation_number, @evaluation_description)
            `);

        console.log("Insertion result:", result);

        res.status(201).send({ message: 'Evaluation added successfully' });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send({ message: err.message });
    }
};

exports.getEvaluations = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;

        const result = await pool.request()
            .input('article_id', id)
            .query('SELECT * FROM Evaluations WHERE article_id = @article_id');

        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Dans articleController.js
exports.deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        const pool = await poolPromise;

        // Supprimer les enregistrements dans User_Article qui référencent cet article
        await pool.request()
            .input('article_id', articleId)
            .query('DELETE FROM User_Article WHERE article_id = @article_id');

        // Ensuite, supprimer l'article lui-même
        await pool.request()
            .input('article_id', articleId)
            .query('DELETE FROM Articles WHERE article_id = @article_id');

        res.status(200).send({ message: 'Article deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Récupérer tous les articles (public)
exports.getAllArticles = async (req, res) => {
    try {
        const pool = await poolPromise;
        const query = `
            SELECT a.*, ua.user_id
            FROM Articles a
            LEFT JOIN User_Article ua ON a.article_id = ua.article_id
        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};



// Récupérer toutes les évaluations d'un utilisateur
exports.getAllEvaluationsByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("User ID:", userId); // Vérifiez que l'ID de l'utilisateur est correct

        // Assurez-vous que userId est un entier
        const parsedUserId = parseInt(userId, 10);
        if (isNaN(parsedUserId)) {
            return res.status(400).send({ message: 'Invalid user ID' });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('user_id', sql.Int, parsedUserId) // Utilisation explicite de sql.Int
            .query('SELECT * FROM Evaluations WHERE user_id = @user_id');

        res.json(result.recordset);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send({ message: err.message });
    }
};



// Mettre à jour une évaluation
exports.updateEvaluation = async (req, res) => {
    try {
        const { articleId, evaluationId } = req.params;
        const { evaluation_number, evaluation_description } = req.body;
        const userId = req.user.id;

        const pool = await poolPromise;
        await pool.request()
            .input('article_id', articleId)
            .input('evaluation_id', evaluationId)
            .input('user_id', userId)
            .input('evaluation_number', evaluation_number)
            .input('evaluation_description', evaluation_description)
            .query(`
                UPDATE Evaluations
                SET evaluation_number = @evaluation_number,
                    evaluation_description = @evaluation_description
                WHERE article_id = @article_id AND evaluation_id = @evaluation_id AND user_id = @user_id
            `);

        res.send({ message: 'Évaluation mise à jour avec succès' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Supprimer une évaluation
exports.deleteEvaluation = async (req, res) => {
    try {
        const { articleId, evaluationId } = req.params;
        const userId = req.user.id;

        const pool = await poolPromise;
        await pool.request()
            .input('article_id', articleId)
            .input('evaluation_id', evaluationId)
            .input('user_id', userId)
            .query('DELETE FROM Evaluations WHERE article_id = @article_id AND evaluation_id = @evaluation_id AND user_id = @user_id');

        res.send({ message: 'Évaluation supprimée avec succès' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Récupérer le prix d'un article spécifique
exports.getArticlePrice = async (req, res) => {
    try {
        const { articleId } = req.params;
        const pool = await poolPromise;

        console.log(`Fetching price for article: ${articleId}`); // Ajout de log

        const result = await pool.request()
            .input('article_id', articleId)
            .query('SELECT article_price FROM Articles WHERE article_id = @article_id');

        const article = result.recordset[0];
        if (!article) {
            return res.status(404).send({ message: 'Article not found' });
        }

        res.json({ article_id: articleId, price: article.article_price });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Récupérer les prix de tous les articles
exports.getAllArticlePrices = async (req, res) => {
    try {
        const pool = await poolPromise;
        console.log(`Fetching all article prices`); // Ajout de log
        const result = await pool.request().query('SELECT article_id, article_price FROM Articles');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Récupérer les articles et leurs prix dans une catégorie spécifique
exports.getCategoryArticlePrices = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const pool = await poolPromise;

        console.log(`Fetching articles and prices for category: ${categoryId}`); // Ajout de log

        const result = await pool.request()
            .input('category_id', categoryId)
            .query('SELECT article_id, article_price FROM Articles WHERE category_id = @category_id');

        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};