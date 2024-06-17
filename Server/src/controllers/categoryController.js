const { poolPromise } = require('../utils/db');

exports.addCategory = async (req, res) => {
    try {
        const { category_name } = req.body;
        const pool = await poolPromise;

        const result = await pool.request()
            .input('category_name', category_name)
            .query('INSERT INTO Categories (category_name) OUTPUT INSERTED.category_id VALUES (@category_name)');

        res.status(201).send({ message: 'Category added successfully', category_id: result.recordset[0].category_id });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Categories');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { category_name } = req.body;
        const pool = await poolPromise;

        await pool.request()
            .input('category_id', categoryId)
            .input('category_name', category_name)
            .query('UPDATE Categories SET category_name = @category_name WHERE category_id = @category_id');

        res.send({ message: 'Category updated successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const pool = await poolPromise;

        await pool.request()
            .input('category_id', categoryId)
            .query('DELETE FROM Categories WHERE category_id = @category_id');

        res.send({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
