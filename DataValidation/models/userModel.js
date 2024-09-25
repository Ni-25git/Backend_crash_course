const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Username must be at least 3 characters long']
    },
    Email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    Phone: {
        type: String,  // Storing phone as a string to avoid issues with leading zeros
        required: [true, 'Phone number is required'],
        match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
    },
    Age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [18, 'Age must be at least 18'],
        max: [65, 'Age must be at most 65']
    }
}, { versionKey: false });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
