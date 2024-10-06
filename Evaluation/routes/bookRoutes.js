const express = require('express');
const BookModel = require('../models/bookModel');
const authMiddleware = require('../middlewares/authMiddleware');
const checkAccessRole = require('../middlewares/checkAccessRole');
const book = express.Router();

book.post('/' , authMiddleware , checkAccessRole('Admin'), async (req,res)=>{
    try {
        const {title , ISBN , summary , publicationDate , genres , copiesAvailable , author , borrowedBy}= req.body;

        const book = new BookModel({title , ISBN , summary , publicationDate , genres , copiesAvailable , author , borrowedBy});
        await book.save();
        res.status(201).json({msg:'Book Details Created' , book})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

book.get('/' , async(req,res)=>{
    try {
        const books = await BookModel.find();
        if(!books){
            return res.status(404).json({msg:'Books not found'})
        }
        res.status(201).json({msg:'List Of Books' , books})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

book.get('/:id' , async(req,res)=>{
    try {
        const {id} = req.params
        const book = await BookModel.findById(id).populate({path:'author'});
        if(!book){
            return res.status(404).json({msg:'Book not found'})
        }
        res.status(201).json({msg:'Book Details' , book})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

book.put('/:id' ,authMiddleware , checkAccessRole('Admin'), async(req,res)=>{
    try {
        const {id} = req.params;
        const {title , ISBN , summary , publicationDate , genres , copiesAvailable , author , borrowedBy} = req.body
        const book = await BookModel.findByIdAndUpdate(id,{title , ISBN , summary , publicationDate , genres , copiesAvailable , author , borrowedBy});
        if(!book){
            return res.status(404).json({msg:'Book not found'})
        }
        await book.save();
        res.status(201).json({msg:'Book Details updated' , book})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

book.delete('/:id' ,authMiddleware , checkAccessRole('Admin'), async(req,res)=>{
    try {
        const {id} = req.params;
        const book = await BookModel.findByIdAndDelete(id);
        if(!book){
            return res.status(404).json({msg:'Book not found'})
        }
        res.status(201).json({msg:'Book Details deleted' , book})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});




module.exports = book;