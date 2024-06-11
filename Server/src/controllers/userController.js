const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { poolPromise } = require('../utils/db');

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
            paypal_address,
            profile_image
        } = req.body;

        const pool = await poolPromise;
        const hashedPassword = await bcrypt.hash(password, 10);
        const registration_date = new Date();

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
            .input('profile_image', profile_image)
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

        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', username)
            .query('SELECT * FROM Users WHERE username = @username');

        const user = result.recordset[0];
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
