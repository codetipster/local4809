const express = require('express');
require('dotenv').config();
const LandListing = require('../models/landListing');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create', auth, async (req, res) => {
    // Check if the user is a landowner
    if (req.user.role !== 'landowner') {
        return res.status(403).send('Access Denied: Only landowners can create listings');
    }

    // Create a new land listing
    const landListing = new LandListing({
        ...req.body,
        owner: req.user._id // Set the owner of the listing
    });

    try {
        const savedListing = await landListing.save();
        res.status(201).json(savedListing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all land listings
router.get('/all', async (req, res) => {
    try {
        const landListings = await LandListing.find(); // Fetch all listings
        res.json(landListings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;