const mongoose = require('mongoose');

const landListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [{
        type: String, // Assuming you'll store image URLs
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model in User Service
        required: true
    },
    // Additional fields can be added here with similar structure
});


const LandListing = mongoose.model('LandListing', landListingSchema);

module.exports = LandListing;