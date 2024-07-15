const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../utils/db");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Configure AWS S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.DO_SPACES_ENDPOINT,
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

const isValidFileType = (file) => {
  const allowedTypes = [
    "image/webp",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg+xml",
  ];
  return allowedTypes.includes(file.mimetype);
};

exports.registerUser = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
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
    } = req.body;

    const profile_image = req.file;

    if (profile_image && !isValidFileType(profile_image)) {
      return res.status(400).send({ message: "Invalid file type" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const registration_date = new Date();

    let profile_image_url = "";
    if (profile_image) {
      const key = `${uuidv4()}${path.extname(profile_image.originalname)}`;
      const command = new PutObjectCommand({
        Bucket: process.env.DO_SPACES_BUCKET,
        Key: key,
        Body: profile_image.buffer,
        ACL: "public-read",
      });
      await s3.send(command);
      profile_image_url = `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT}/${key}`;
    }

    const [result] = await connection.query(
      `
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
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
      [
        username,
        biography,
        first_name,
        last_name,
        street,
        street_number,
        apartment,
        postal_code,
        city,
        hashedPassword,
        email,
        registration_date,
        paypal_address,
        profile_image_url,
      ],
    );

    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ message: err.message });
  } finally {
    if (connection) connection.release();
  }
};

exports.getAllUsers = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM Users");
    res.json(rows);
  } catch (err) {
    res.status(500).send({ message: err.message });
  } finally {
    if (connection) connection.release();
  }
};

exports.loginUser = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const { username, password } = req.body;

    const [rows] = await connection.query(
      "SELECT * FROM Users WHERE username = ?",
      [username],
    );

    const user = rows[0];
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.hashed_password,
    );
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  } finally {
    if (connection) connection.release();
  }
};

exports.getUserInfo = async (req, res) => {
  let connection;
  try {
    const userId = req.user.id;

    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM Users WHERE user_id = ?",
      [userId],
    );

    const user = rows[0];
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  } finally {
    if (connection) connection.release();
  }
};

exports.getUserById = async (req, res) => {
  let connection;
  try {
    const { userId } = req.params;

    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM Users WHERE user_id = ?",
      [userId],
    );

    const user = rows[0];
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  } finally {
    if (connection) connection.release();
  }
};

exports.updateUser = async (req, res) => {
  let connection;
  try {
    const { userId } = req.params;
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
      paypal_address,
    } = req.body;

    const profile_image = req.file;

    if (profile_image && !isValidFileType(profile_image)) {
      return res.status(400).send({ message: "Invalid file type" });
    }

    connection = await pool.getConnection();
    let profile_image_url = "";
    if (profile_image) {
      const key = `${uuidv4()}${path.extname(profile_image.originalname)}`;
      const command = new PutObjectCommand({
        Bucket: process.env.DO_SPACES_BUCKET,
        Key: key,
        Body: profile_image.buffer,
        ACL: "public-read",
      });
      await s3.send(command);
      profile_image_url = `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT}/${key}`;
    }

    const fields = {
      biography,
      first_name,
      last_name,
      street,
      street_number,
      apartment,
      postal_code,
      city,
      email,
      paypal_address,
      profile_image: profile_image_url || null,
    };

    // Filtrer les champs non nuls ou non indéfinis
    const filteredFields = Object.entries(fields).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (Object.keys(filteredFields).length === 0) {
      return res.status(400).send({ message: "No fields to update" });
    }

    const sql =
      "UPDATE Users SET " +
      Object.keys(filteredFields)
        .map((key) => `${key} = ?`)
        .join(", ") +
      " WHERE user_id = ?";
    const values = [...Object.values(filteredFields), userId];

    await connection.query(sql, values);

    res.send({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  } finally {
    if (connection) connection.release();
  }
};

