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
        const { article_description, article_price, shipping_cost, category_name } = req.body;
        const article_photo = req.file;

        if (article_photo && !isValidFileType(article_photo)) {
            return res.status(400).send({ message: 'Invalid file type' });
        }

        const pool = await poolPromise;

        // Vérifier si la catégorie existe déjà
        let categoryResult = await pool.request()
            .input('category_name', category_name)
            .query('SELECT category_id FROM Categories WHERE category_name = @category_name');
        
        let category_id;
        if (categoryResult.recordset.length > 0) {
            category_id = categoryResult.recordset[0].category_id;
        } else {
            // Ajouter une nouvelle catégorie si elle n'existe pas
            let categoryInsertResult = await pool.request()
                .input('category_name', category_name)
                .query('INSERT INTO Categories (category_name) OUTPUT INSERTED.category_id VALUES (@category_name)');
            category_id = categoryInsertResult.recordset[0].category_id;
        }

        // Gérer l'image
        let article_photo_url = '';
        if (article_photo) {
            const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
            const containerClient = blobServiceClient.getContainerClient('article-images');
            const blobName = uuidv4() + path.extname(article_photo.originalname);
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadData(article_photo.buffer);
            article_photo_url = blockBlobClient.url;
        }

        // Ajouter l'article à la base de données
        await pool.request()
            .input('article_description', article_description)
            .input('article_price', article_price)
            .input('shipping_cost', shipping_cost)
            .input('category_id', category_id)
            .input('category_name', category_name)
            .input('article_photo', article_photo_url)
            .query(`
                INSERT INTO Articles (
                    article_description,
                    article_price,
                    shipping_cost,
                    category_id,
                    category_name,
                    article_photo
                ) VALUES (
                    @article_description,
                    @article_price,
                    @shipping_cost,
                    @category_id,
                    @category_name,
                    @article_photo
                )
            `);

        res.status(201).send({ message: 'Article added successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllArticles = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Articles');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
