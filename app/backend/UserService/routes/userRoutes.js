const express = require('express');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken'); // to generate signed token
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            Email: req.body.email,
            Password: hashedPassword,
            Role: req.body.role
        });

        const savedUser = await newUser.save();
        // Respond with user details, omitting sensitive information like password
        res.status(201).json({
            _id: savedUser._id,
            Email: savedUser.Email,
            Role: savedUser.Role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        // Check if the user exists
        const user = await User.findOne({ Email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare the password with the hashed password in the database
        const validPassword = await bcrypt.compare(req.body.password, user.Password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Create and assign a token
        const token = jwt.sign(
            { _id: user._id, role: user.Role },
            process.env.JWT_SECRET, // Ensure you have a JWT_SECRET in your .env file
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.header('auth-token', token).json({
            token: token,
            user: {
                _id: user._id,
                Email: user.Email,
                Role: user.Role,
                isProfileComplete: user.isProfileComplete,
                profileDetails: user.profileDetails
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// update user profile
router.put('/update-profile/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: {Name: req.body.Name, profileDetails: req.body.profileDetails, isProfileComplete: true } },
            { new: true }
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// delete user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /users/:id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // Exclude sensitive information like password
        res.json({ Name: user.Name, Email: user.Email, Role: user.Role,  _id: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;