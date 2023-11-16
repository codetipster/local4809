const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
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
    Role: {
        type: String,
        required: true,
        enum: ['consumer', 'farmer', 'landowner'] 
    },
    profileDetails: {
        type: mongoose.Schema.Types.Mixed, // Allows for flexibility in the data stored in this field
        default: {}
    }
    
});

const User = mongoose.model('User', userSchema);

module.exports = User;
