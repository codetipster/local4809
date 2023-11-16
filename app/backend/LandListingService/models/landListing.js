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
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        required: true
    },
    // Additional fields can be added here with similar structure
});


const LandListing = mongoose.model('LandListing', landListingSchema);

module.exports = LandListing;