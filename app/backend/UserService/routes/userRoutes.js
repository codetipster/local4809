const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            Name: req.body.name,
            Email: req.body.email,
            Password: hashedPassword,
            Role: req.body.role
        });

        const savedUser = await newUser.save();
        // Respond with user details, omitting sensitive information like password
        res.status(201).json({
            _id: savedUser._id,
            Name: savedUser.Name,
            Email: savedUser.Email,
            Role: savedUser.Role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;