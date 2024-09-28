const express = require('express');
const UserModel = require('../models/userModel');
const user = express.Router();
const jwt = require('jsonwebtoken')

user.get('/', (req,res)=>{
    res.send('Welcoome in user route')
});

user.post("/signup" , async (req,res)=>{
    try {
        const {username , email , password} = req.body;
        const user = new UserModel({username , email , password});
        await user.save()
        console.log(user)
        res.status(201).json({msg:'User signup successfiully' , user})
    } catch (error) {
        res.status(401).json({msg:error.message})
    }
});

user.post('/login' , async (req,res)=>{
    try {
        const {email , password} = req.body;
        const user = await UserModel.findOne({email});

        if(!user){
          return  res.status(400).json({msg:'Please login first'});
        }
        const token = jwt.sign({data: 'email'} , process.env.JWT_SECRET , {expiresIn: '1h'});
        console.log(token)


        res.status(201).json({msg:`${user.username} logged in successfully`,token})
    } catch (error) {
           res.status(401).json({msg:error.message})
    }
})

module.exports = user