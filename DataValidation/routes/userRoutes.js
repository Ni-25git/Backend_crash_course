const express = require('express');
const UserModel = require('../models/userModel');
const user = express.Router();

user.use(express.json());  // Middleware to parse JSON body

// Welcome route
user.get("/", (req, res) => {
    res.send('Welcome to user routes');
});

user.post("/post",  async (req, res) => {
    try {

        const { Name, Email, Phone, Age } = req.body;

        const user = new UserModel({ Name, Email, Phone, Age });

        await user.save();

        console.log(user);
        res.status(201).json({ msg: 'User added successfully', user });
    } catch (error) {
        // Send validation errors or server errors
        res.status(400).json({ msg: error.message });
    }
});

module.exports = user;
