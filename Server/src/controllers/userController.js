const User = require('../models/userModel');

const getAllUsers = (req, res) => {
    User.getAll((err, users) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(users);
    });
};

module.exports = {
    getAllUsers
};
