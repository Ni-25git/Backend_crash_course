const express = require('express');
const UserModel = require('../models/userModel');
const user = express.Router();


user.get("/get", async (req,res)=>{
    try {
        const user = await UserModel.find();
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({msg: error.msg}) 
    }
});

user.post("/post", async (req,res)=>{
    try {
        const {username , email , password} = req.body;
        const existingUser = await UserModel.findOne({ email});
        if(existingUser){
            return res.status(400).json({msg:'User has already present with this email'})
        }
        const user = new UserModel({username , email , password});
        await user.save();
        res.status(201).json({msg:'User has been created',user})
    } catch (error) {
        res.status(500).json({msg: error.msg})
    }
});

user.put("/:userId", async (req,res)=>{
    try {
        const {userId} = req.params;
        const {email , password} = req.body;
        const user = await UserModel.findByIdAndUpdate(userId , {email , password});
        if(!user){
            return res.status(400).json({msg:'User has not found'})
        }
        res.status(201).json({msg: 'user has been updated with this id', user})

    } catch (error) {
        res.status(500).json({msg: error.msg})
    }
});

user.delete("/:userId" , async (req,res)=>{
    try {
        const {userId} = req.params;
        const user = await UserModel.findByIdAndDelete(userId);
        if(!user){
            return res.status(400).json({msg:'UserId has not found'})
        };
        res.status(201).json({msg: 'user has been delted with this id', user})
    } catch (error) {
        res.status(500).json({msg: error.msg})
    }
})


module.exports = user;