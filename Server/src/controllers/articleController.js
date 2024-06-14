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
                ) OUTPUT INSERTED.article_id VALUES (
                    @article_description,
                    @article_price,
                    @shipping_cost,
                    @category_id,
                    @category_name,
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
