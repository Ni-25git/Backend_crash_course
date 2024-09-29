const express = require('express');
const user = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const UserModel = require('../models/userModel');
const saltRounds = 10;

user.get('/',(req,res)=>{
    res.send('welcome in user route')
});

user.post("/register" , async (req,res)=>{
    try {
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(401).json({msg:'Provide email and password'})
        }
        const hashedPassword = await bcrypt.hash(password , saltRounds);

        const user = new UserModel({email , password:hashedPassword});
        await user.save();
        console.log(user);

        res.status(201).json({msg:'User signup successfully' , user})

    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});


user.post("/login" , async (req,res)=>{
    try {
        const {email , password} = req.body;

        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(401).json({msg:'User not found : Please Signup in signup route'})
        };

        const token = jwt.sign({email , password} , process.env.JWT_SECRET_KEY , {expiresIn: '1h'})

        const isValid = await bcrypt.compare(password , user.password);

        if(isValid){
            return res.status(201).json({msg:`${user.email} logged in successfully`,token})
        }else{
            return res.status(401).json({msg:'Password not verify'})
        }


        
        
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
})

module.exports = user;