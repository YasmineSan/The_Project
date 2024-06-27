const { poolPromise } = require('../utils/db'); // Importe la connexion à la base de données
const { BlobServiceClient } = require('@azure/storage-blob'); // Importe le service de Blob d'Azure pour gérer le stockage des fichiers
const path = require('path'); // Importe le module path pour manipuler les chemins de fichiers
const { v4: uuidv4 } = require('uuid'); // Importe la fonction uuidv4 pour générer des identifiants uniques

// Fonction pour vérifier si le type de fichier est valide
const isValidFileType = (file) => {
    const allowedTypes = ['image/webp', 'image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
    return allowedTypes.includes(file.mimetype);
};

// Ajout d'un article
exports.addArticle = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log le corps de la requête
        console.log('File:', req.file); // Log le fichier uploadé

        const { title, article_description, article_price, shipping_cost, category_name } = req.body;
        const article_photo = req.file;
        const userId = req.user.id;

        // Vérifie si le type de fichier est valide
        if (article_photo && !isValidFileType(article_photo)) {
            return res.status(400).send({ message: 'Invalid file type' });
        }

        const pool = await poolPromise;

        let article_photo_url = '';
        if (article_photo) {
            // Upload du fichier sur Azure Blob Storage
            const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
            const containerClient = blobServiceClient.getContainerClient('article-images');
            const blobName = uuidv4() + path.extname(article_photo.originalname);
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadData(article_photo.buffer);
            article_photo_url = blockBlobClient.url;
        }

        // Vérifie si la catégorie existe ou doit être créée
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

        // Insère l'article dans la base de données
        const articleResult = await pool.request()
            .input('title', title)
            .input('article_description', article_description)
            .input('article_price', article_price)
            .input('shipping_cost', shipping_cost)
            .input('category_id', category_id)
            .input('article_photo', article_photo_url)
            .input('date_added', new Date()) // Ajoute la date actuelle
            .query(`
                INSERT INTO Articles (
                    title,
                    article_description,
                    article_price,
                    shipping_cost,
                    category_id,
                    article_photo,
                    date_added
                ) OUTPUT INSERTED.article_id VALUES (
                    @title,
                    @article_description,
                    @article_price,
                    @shipping_cost,
                    @category_id,
                    @article_photo,
                    @date_added
                )
            `);

        const article_id = articleResult.recordset[0].article_id;

        // Lien entre l'article et l'utilisateur
        await pool.request()
            .input('user_id', userId)
            .input('article_id', article_id)
            .query('INSERT INTO User_Article (user_id, article_id) VALUES (@user_id, @article_id)');

        res.status(201).send({ message: 'Article added successfully' });
    } catch (err) {
        console.error('Error:', err); // Log l'erreur
        res.status(500).send({ message: err.message });
    }
};

// Récupère tous les articles d'un utilisateur
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

// Récupère un article spécifique d'un utilisateur
exports.getArticleByUser = async (req, res) => {
    try {
        const { articleId } = req.params;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('article_id', articleId)
            .query(`
                SELECT a.*
                FROM Articles a
                INNER JOIN User_Article ua ON a.article_id = ua.article_id
                WHERE a.article_id = @article_id
            `);
        const article = result.recordset[0];
        if (!article) {
            return res.status(404).send({ message: 'Article not found' });
        }
        res.json(article);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Met à jour un article
exports.updateArticle = async (req, res) => {
    try {
        const { articleId } = req.params;
        const { title, article_description, article_price, shipping_cost, category_name } = req.body;
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
            .input('title', title)
            .input('article_description', article_description)
            .input('article_price', article_price)
            .input('shipping_cost', shipping_cost)
            .input('category_name', category_name)
            .input('article_photo', article_photo_url)
            .query(`
                UPDATE Articles
                SET title = @title,
                    article_description = @article_description,
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

// Supprime un article
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

// Récupère un article par son ID
exports.getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;

        console.log(`Fetching article with ID: ${id}`); // Ajout de log pour l'ID de l'article

        const result = await pool.request()
            .input('article_id', id)
            .query(`
                SELECT a.*, u.profile_image as user_photo, u.user_id
                FROM Articles a
                INNER JOIN User_Article ua ON a.article_id = ua.article_id
                INNER JOIN Users u ON ua.user_id = u.user_id
                WHERE a.article_id = @article_id
            `);

        console.log(`Query result: ${JSON.stringify(result.recordset)}`); // Ajout de log pour les résultats de la requête

        const article = result.recordset[0];
        if (!article) {
            return res.status(404).send({ message: 'Article not found' });
        }

        res.json(article);
    } catch (err) {
        console.error('Error fetching article:', err); // Log de l'erreur
        res.status(500).send({ message: err.message });
    }
};

// Récupère tous les articles d'un utilisateur par user_id (public)
exports.getArticlesByUserId = async (req, res) => {
    try {
        const { userId } = req.params; // Récupère le user_id des paramètres de la requête
        const pool = await poolPromise;

        const result = await pool.request()
            .input('user_id', userId)
            .query(`
                SELECT a.*, u.profile_image as user_photo, u.user_id
                FROM Articles a
                INNER JOIN User_Article ua ON a.article_id = ua.article_id
                INNER JOIN Users u ON ua.user_id = u.user_id
                WHERE ua.user_id = @user_id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).send({ message: 'No articles found for this user' });
        }

        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching articles:', err); // Log de l'erreur
        res.status(500).send({ message: err.message });
    }
};


// Ajoute une évaluation à un article
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

// Récupère toutes les évaluations d'un article
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

// Supprime un article (à un autre endroit, peut-être une duplication)
exports.deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        const pool = await poolPromise;

        // Supprime les enregistrements dans User_Article qui référencent cet article
        await pool.request()
            .input('article_id', articleId)
            .query('DELETE FROM User_Article WHERE article_id = @article_id');

        // Ensuite, supprime l'article lui-même
        await pool.request()
            .input('article_id', articleId)
            .query('DELETE FROM Articles WHERE article_id = @article_id');

        res.status(200).send({ message: 'Article deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Récupère tous les articles (public)
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

// Récupère toutes les évaluations d'un utilisateur
exports.getAllEvaluationsByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("User ID:", userId); // Vérifie que l'ID de l'utilisateur est correct

        // Assure-toi que userId est un entier
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

// Met à jour une évaluation
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

// Supprime une évaluation
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

// Récupère le prix d'un article spécifique
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

// Récupère les prix de tous les articles
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

// Récupère les articles et leurs prix dans une catégorie spécifique
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
