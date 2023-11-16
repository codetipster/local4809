const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.LAND_LISTING_MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Land Listing Database connected successfully');
    } catch (err) {
        console.error('Land Listing Database connection error:', err);
    }
};

module.exports = connectDB;
