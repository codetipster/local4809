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
    Role: {
        type: String,
        required: true,
        enum: ['consumer', 'farmer', 'landowner'] 
    }
    
});

const User = mongoose.model('User', userSchema);

module.exports = User;
