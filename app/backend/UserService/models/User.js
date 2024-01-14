const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true // Ensures email addresses are unique across users
    },
    Password: {
        type: String,
        required: true
    },
    isProfileComplete: {
        type: Boolean,
        default: false
    },
    Name: {
        type: String,   
    },
    Role: {
        type: String,
        required: true,
        enum: ['consumer', 'farmer', 'landowner'] 
    },
    profileDetails: {
        Phone: {
            type: String,
        },
        Address: {
            type: String,
        },
        ProfileImage: {
            type: String, // Assuming you'll store image URLs
        },
        GovernmentID: {
            type: String, // Assuming you'll store ID images or numbers
        },
    },
    isAuthenticated: {
        type: Boolean,
        default: false
    },
    Lands: [{
        type: String, // IDs of lands owned by the user
    }],
    Equipments: [{
        type: String, // IDs of equipment owned by the user
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;