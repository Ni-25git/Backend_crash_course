const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const checkAccessRole = require('../middlewares/checkAccessRole');
const BorrowingModel = require('../models/borrowingModel');
const borrow = express.Router();

borrow.post("/" , authMiddleware , checkAccessRole('Member') , async (req,res)=>{
    try {
        const {book , member , borrowDate , dueDate , returnDate , status} = req.body;
        const borrowBook = new BorrowingModel({book , member , borrowDate , dueDate , returnDate , status});
        await borrowBook.save();
        res.status(201).json({msg:'Borrow Book Details Created' , borrowBook})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

borrow.get('/' , authMiddleware , checkAccessRole('Admin'), async(req,res)=>{
    try {
        const borrowBooks = await BorrowingModel.find();
        if(!borrowBooks){
            return res.status(404).json({msg:'borrowBooks not found'})
        }
        res.status(201).json({msg:'List Of Books' , borrowBooks})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});






module.exports = borrow;