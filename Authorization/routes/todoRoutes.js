const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const TodoModel = require('../models/todoModel');
const todo = express.Router();

todo.use(authMiddleware)

todo.get('/' ,authMiddleware, (req,res)=>{
    res.send('welcome in todo')
});

todo.post('/todos' , async (req,res)=>{
    try {
        const {title , description , completed , isPublic , userId}= req.body;

        const todo = new TodoModel({title,description,completed,isPublic ,userId});

        await todo.save();

        res.status(201).json({msg:'Todo save successfully',todo})

    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});

todo.get('/todos' , async (req,res)=>{
    try {
        const todo = await TodoModel.find({isPublic:true}).populate({path:'userId' , select:'email'});
        res.status(201).json(todo)
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});

todo.put('/todos/:todoId' , async (req,res)=>{
    try {
        const {todoId} = req.params;
        const {title , description , completed , isPublic , userId} = req.body;


        const updatedTodo = await TodoModel.findByIdAndUpdate(todoId , {title , description , completed , isPublic , userId});
        res.status(201).json({msg:'Todo  updated successfully', updatedTodo});
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});

todo.delete('/todos/:todoId' , async (req,res)=>{
    try {
        const {todoId} = req.params;


        const deletedTodo = await TodoModel.findByIdAndDelete(todoId);
        res.status(201).json({msg:'Todo  deleted successfully', deletedTodo});
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});







module.exports = todo