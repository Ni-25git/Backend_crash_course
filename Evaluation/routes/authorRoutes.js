const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const checkAccessRole = require('../middlewares/checkAccessRole');
const AuthorModel = require('../models/authorModel');
const author = express.Router();

author.post('/' , authMiddleware , checkAccessRole('Admin'), async (req,res)=>{
    try {
        const {name , biography , dateOfBirth , nationality , books}= req.body;

        const author = new AuthorModel({name , biography , dateOfBirth , nationality , books})
        await author.save();
        res.status(201).json({msg:'Author Details Created' , author})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

author.get('/' , async(req,res)=>{
    try {
        const authors = await AuthorModel.find();
        if(!authors){
            return res.status(404).json({msg:'Authors not found'})
        }
        res.status(201).json({msg:'List Of Users' , authors})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

author.get('/:id' , async(req,res)=>{
    try {
        const {id} = req.params
        const author = await AuthorModel.findById(id);
        if(!author){
            return res.status(404).json({msg:'Author not found'})
        }
        res.status(201).json({msg:'Author Details' , author})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

author.put('/:id' ,authMiddleware , checkAccessRole('Admin'), async(req,res)=>{
    try {
        const {id} = req.params;
        const {name , biography , dateOfBirth , nationality , books} = req.body
        const author = await AuthorModel.findByIdAndUpdate(id,{name , biography , dateOfBirth , nationality , books});
        if(!author){
            return res.status(404).json({msg:'Author not found'})
        }
        await author.save();
        res.status(201).json({msg:'Author Details updated' , author})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

author.delete('/:id' ,authMiddleware , checkAccessRole('Admin'), async(req,res)=>{
    try {
        const {id} = req.params;
        const author = await AuthorModel.findByIdAndDelete(id);
        if(!author){
            return res.status(404).json({msg:'Author not found'})
        }
        res.status(201).json({msg:'Author Details deleted' , author})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});



module.exports = author;