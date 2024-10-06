const express = require('express');
const UserModel = require('../models/userModel');
const user = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
const checkAccessRole = require('../middlewares/checkAccessRole');


user.post('/auth/register' , async (req,res)=>{
    try {
        const {username , password , name , email , role}= req.body;
        const hashedPassword = await bcrypt.hash(password , 10);
        const user = new UserModel({username , password:hashedPassword , name , email , role});
        await user.save();
        res.status(201).json({msg:'User Registerd sucessfully' , user})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

user.post('/auth/login' , async (req,res)=>{
    try {
        const {username , password} = req.body;
        
        const user = await UserModel.findOne({username});
        
        if(!user){
            return res.status(401).json({msg:'User not found'});
        };
        
        const validPassword = await bcrypt.compare(password , user.password);
        
        
        if(!validPassword){
            return res.status(401).json({msg:'Password is wrong'});
        };
        const token = jwt.sign({email : user.email , id:user._id} , process.env.JWT_SECRET_KEY , {expiresIn : '1h'});
        
        res.status(201).json({msg:`${user.name} logged in successfully` , token})
        
        
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})

user.get('/users' , authMiddleware, checkAccessRole('Admin'), async(req,res)=>{
    try {
        const users = await UserModel.find();
        if(!users){
            return res.status(404).json({msg:'Users not found'})
        }
        res.status(201).json({msg:'List Of Users' , users})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

user.get('/users/:id' , authMiddleware , checkAccessRole(['Admin' , 'Member']), async(req,res)=>{
    try {
        const {id} = req.params
        const user = await UserModel.findById(id);
        if(!user){
            return res.status(404).json({msg:'Users not found'})
        }
        res.status(201).json({msg:'User Details' , user})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

user.put("/users/:id" , authMiddleware, checkAccessRole(['Admin' , 'Member']), async (req,res)=>{
    try {
        const {id} = req.params
        const {name , email , password , borrowedBooks} = req.body;
        const hashedPassword = await bcrypt.hash(password , 10)

        const  user = await UserModel.findByIdAndUpdate(id , {name , email , password:hashedPassword, borrowedBooks});

        if(!user){
            return res.status(404).json({msg:'Users not found'})
        }

        await user.save();
        res.status(201).json({msg:'User Details updated' , user})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

user.delete("/users/:id" ,authMiddleware , checkAccessRole('Admin'), async (req,res)=>{
    try {
        const {id} = req.params

        const  user = await UserModel.findByIdAndDelete(id );

        if(!user){
            return res.status(404).json({msg:'Users not found'})
        }

        res.status(201).json({msg:'User Delete successfully' , user})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})

module.exports = user;