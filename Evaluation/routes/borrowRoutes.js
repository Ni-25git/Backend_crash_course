const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const checkAccessRole = require('../middlewares/checkAccessRole');
const BorrowingModel = require('../models/borrowingModel');
const BookModel = require('../models/bookModel');
const UserModel = require('../models/userModel');
const borrow = express.Router();



borrow.post("/", authMiddleware, checkAccessRole('Member'), async (req, res) => {
    try {
        const { book, member, borrowDate, dueDate, returnDate, status } = req.body;

        
        const borrowBook = new BorrowingModel({ book, member, borrowDate, dueDate, returnDate, status });
        await borrowBook.save();

        
        const updatedBook = await BookModel.findByIdAndUpdate(book, { $inc: { copiesAvailable: -1 } }, { new: true });


        const updatedUser = await UserModel.findByIdAndUpdate(
            member,
            { $push: { borrowedBooks: book } },
            { new: true }
        );

        res.status(201).json({ 
            msg: 'Borrow Book Details Created', 
            borrowBook,
            updatedBook, 
            updatedUser 
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

borrow.get('/' , authMiddleware , checkAccessRole('Admin'), async(req,res)=>{
    try {
        const borrowBooks = await BorrowingModel.find().populate('book').populate('member');
        if(!borrowBooks){
            return res.status(404).json({msg:'borrowBooks not found'})
        }
        res.status(201).json({msg:'List Of Books' , borrowBooks})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

borrow.get('/my' , authMiddleware , checkAccessRole('Member'), async(req,res)=>{
    try {
        const borrowBooks = await BorrowingModel.find({ member: req.user._id }).populate('book').populate('member');
        if(!borrowBooks){
            return res.status(404).json({msg:'No borrowing history found for this member'})
        }
        res.status(201).json({msg:'List Of Borrowing Books' , borrowBooks})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

borrow.put('/:id/return', authMiddleware, checkAccessRole(['Member', 'Admin']), async (req, res) => {
    try {
    
        const borrowTransaction = await BorrowingModel.findById(req.params.id).populate('book').populate('member');
        
        if (!borrowTransaction) {
            return res.status(404).json({ msg: 'Borrowing transaction not found' });
        }

    
        if (borrowTransaction.status === 'returned') {
            return res.status(400).json({ msg: 'This book has already been returned' });
        }

        
        borrowTransaction.status = 'returned';
        borrowTransaction.returnDate = new Date();
        await borrowTransaction.save();

        
        await BookModel.findByIdAndUpdate(borrowTransaction.book._id, { $inc: { copiesAvailable: 1 } }, { new: true });

        res.status(200).json({ msg: 'Book returned successfully', borrowTransaction });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});







module.exports = borrow;