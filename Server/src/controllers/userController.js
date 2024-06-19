const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { poolPromise } = require('../utils/db');
const { BlobServiceClient } = require('@azure/storage-blob');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const isValidFileType = (file) => {
    const allowedTypes = ['image/webp', 'image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
    return allowedTypes.includes(file.mimetype);
};

exports.getAllUsers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Users');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const {
            username,
            biography,
            first_name,
            last_name,
            street,
            street_number,
            apartment,
            postal_code,
            city,
            password,
            email,
            paypal_address
        } = req.body;

        const profile_image = req.file;

        if (profile_image && !isValidFileType(profile_image)) {
            return res.status(400).send({ message: 'Invalid file type' });
        }

        const pool = await poolPromise;
        const hashedPassword = await bcrypt.hash(password, 10);
        const registration_date = new Date();

        let profile_image_url = '';
        if (profile_image) {
            const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
            const containerClient = blobServiceClient.getContainerClient('user-images');
            const blobName = uuidv4() + path.extname(profile_image.originalname);
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadData(profile_image.buffer);
            profile_image_url = blockBlobClient.url;
        }

        await pool.request()
            .input('username', username)
            .input('biography', biography)
            .input('first_name', first_name)
            .input('last_name', last_name)
            .input('street', street)
            .input('street_number', street_number)
            .input('apartment', apartment)
            .input('postal_code', postal_code)
            .input('city', city)
            .input('hashed_password', hashedPassword)
            .input('email', email)
            .input('registration_date', registration_date)
            .input('paypal_address', paypal_address)
            .input('profile_image', profile_image_url)
            .query(`
                INSERT INTO Users (
                    username,
                    biography,
                    first_name,
                    last_name,
                    street,
                    street_number,
                    apartment,
                    postal_code,
                    city,
                    hashed_password,
                    email,
                    registration_date,
                    paypal_address,
                    profile_image
                ) VALUES (
                    @username,
                    @biography,
                    @first_name,
                    @last_name,
                    @street,
                    @street_number,
                    @apartment,
                    @postal_code,
                    @city,
                    @hashed_password,
                    @email,
                    @registration_date,
                    @paypal_address,
                    @profile_image
                )
            `);

        res.status(201).send({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('Username:', username);
        console.log('Password:', password);

        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', username)
            .query('SELECT * FROM Users WHERE username = @username');

        const user = result.recordset[0];
        if (!user) {
            console.log('User not found');
            return res.status(400).send({ message: 'User not found' });
        }

        console.log('User found:', user);

        const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
        console.log('Password valid:', isPasswordValid);
        
        if (!isPasswordValid) {
            return res.status(400).send({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({ message: err.message });
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const userId = req.user.id;

        const pool = await poolPromise;
        const result = await pool.request()
            .input('user_id', userId)
            .query('SELECT * FROM Users WHERE user_id = @user_id');

        const user = result.recordset[0];
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Méthode pour récupérer les informations d'un utilisateur spécifique
exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;  // Utilise l'ID de l'utilisateur passé en paramètre

        const pool = await poolPromise;
        const result = await pool.request()
            .input('user_id', userId)
            .query('SELECT * FROM Users WHERE user_id = @user_id');

        const user = result.recordset[0];
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Méthode pour mettre à jour les informations d'un utilisateur spécifique
exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;  // Utilise l'ID de l'utilisateur passé en paramètre
        const {
            biography,
            first_name,
            last_name,
            street,
            street_number,
            apartment,
            postal_code,
            city,
            email,
            paypal_address
        } = req.body;

        const profile_image = req.file;

        if (profile_image && !isValidFileType(profile_image)) {
            return res.status(400).send({ message: 'Invalid file type' });
        }

        const pool = await poolPromise;
        const request = pool.request().input('user_id', userId);

        if (biography) request.input('biography', biography);
        if (first_name) request.input('first_name', first_name);
        if (last_name) request.input('last_name', last_name);
        if (street) request.input('street', street);
        if (street_number) request.input('street_number', street_number);
        if (apartment) request.input('apartment', apartment);
        if (postal_code) request.input('postal_code', postal_code);
        if (city) request.input('city', city);
        if (email) request.input('email', email);
        if (paypal_address) request.input('paypal_address', paypal_address);

        let profile_image_url = '';
        if (profile_image) {
            const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
            const containerClient = blobServiceClient.getContainerClient('user-images');
            const blobName = uuidv4() + path.extname(profile_image.originalname);
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadData(profile_image.buffer);
            profile_image_url = blockBlobClient.url;
            request.input('profile_image', profile_image_url);
        }

        let query = 'UPDATE Users SET';
        const fieldsToUpdate = [];
        if (biography) fieldsToUpdate.push('biography = @biography');
        if (first_name) fieldsToUpdate.push('first_name = @first_name');
        if (last_name) fieldsToUpdate.push('last_name = @last_name');
        if (street) fieldsToUpdate.push('street = @street');
        if (street_number) fieldsToUpdate.push('street_number = @street_number');
        if (apartment) fieldsToUpdate.push('apartment = @apartment');
        if (postal_code) fieldsToUpdate.push('postal_code = @postal_code');
        if (city) fieldsToUpdate.push('city = @city');
        if (email) fieldsToUpdate.push('email = @email');
        if (paypal_address) fieldsToUpdate.push('paypal_address = @paypal_address');
        if (profile_image) fieldsToUpdate.push('profile_image = @profile_image');

        query += ` ${fieldsToUpdate.join(', ')} WHERE user_id = @user_id`;

        await request.query(query);

        res.send({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
