const express = require('express');
const user = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const saltRounds = 10

user.get("/", (req,res)=>{
    res.send("checking routes")
});

user.post('/register' , async (req,res)=>{
    try {
        const {email , password , dob , mobileNumber} = req.body;

        const hashedPassword = await bcrypt.hash(password , saltRounds);

        const user = new UserModel({email , password:hashedPassword , dob , mobileNumber});
        await user.save();
        console.log(hashedPassword);

        res.status(201).json({msg:'User Signup successfully', user})

    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});

user.get('/:email', async (req,res)=>{
    try {
        const {email} = req.params;
        const user = await UserModel.findOne({email},{password:0});

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(201).json(user)
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});

user.post('/resetpassword' , async (req,res)=>{
    try {
        const {email , newPassword}= req.body;

        if (!email || !newPassword) {
            return res.status(400).json({ msg: 'Email and new password are required.' });
        };

        const user = await UserModel.findOne({email});

        if (!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword , saltRounds);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ msg: 'Password reset successfully.' });

    } catch (error) {
        res.status(501).json({ msg: error.message });
    }
});


module.exports = user; 