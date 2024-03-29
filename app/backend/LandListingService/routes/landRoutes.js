const axios = require('axios');
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

    // Extract the images from the request body
    const { images } = req.body;

    // Check if at least one image is provided
    if (!images || images.length === 0) {
        return res.status(400).json({ message: 'At least one image is required' });
    }

    // Create a new land listing with images
    // const landListing = new LandListing({
    //     ...req.body,
    //     owner: req.user._id, // Set the owner of the listing
    // });

    // try {
    //     const savedListing = await landListing.save();
    //     await axios.post('http://localhost:5000/api/users/updateLandList', {
    //         userId: req.user._id,
    //         landId: savedListing._id
    //     });
    //     res.status(201).json(savedListing);
    // } catch (error) {
    //     res.status(400).json({ message: error.message });
    // }

    try {
        // Fetch the lister's details from the User Service
        const userResponse = await axios.get(`http://localhost:5000/api/users/${req.user._id}`);
        const listerName = userResponse.data.Name; // Assuming the User Service returns an object with a Name field

        // Create a new land listing with images and lister's details
        const landListing = new LandListing({
            ...req.body,
            owner: req.user._id,
            ownerName: listerName // Include the lister's name
        });

        const savedListing = await landListing.save();
        
        
        await axios.post('http://localhost:5000/api/users/updateLandList', {
            userId: req.user._id,
            landId: savedListing._id
        });

        res.status(201).json(savedListing);
    } catch (error) {
        
        res.status(500).json({ message: error.message });
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