const express = require('express');
const todo = express.Router();
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname,"user.json")

todo.use(express.json());

todo.get('/getTodo',(req,res)=>{
    try {
        const data = fs.readFileSync(filePath);
        const parsedData = JSON.parse(data);
        res.status(201).json(parsedData.todos)
    } catch (error) {
        res.status(504).json(error)
    }
})

todo.post('/postTodo', (req,res)=>{
    try {
        const {task , status} = req.body;
        const data = fs.readFileSync(filePath);
        const parsedData = JSON.parse(data);

        let todoIdCounter = parsedData.todos.length>0 ? parsedData.todos[parsedData.todos.length -1].id+1 : 1;

        const newTodo ={id: todoIdCounter++ , task , status};
        parsedData.todos.push(newTodo);
        fs.writeFileSync(filePath , JSON.stringify(parsedData , null ,2) , 'utf-8');
        res.status(201).json(newTodo)
    } catch (error) {
     res.status(504).json(error)   
    }
});

todo.patch('/update/:id',(req,res)=>{
    try {
        const {id} = req.params;
        const {task , status} = req.body;
        const data = fs.readFileSync(filePath);
        const parsedData= JSON.parse(data);

        const userIndex = parsedData.todos.findIndex(todo=> todo.id=== parseInt(id));

        if(userIndex===-1){
            return res.status(401).json({msg: "id not found to update"})
        }

        parsedData.todos[userIndex]= {
            ...parsedData.todos[userIndex], task , status
            
        }
        fs.writeFileSync(filePath , JSON.stringify(parsedData , null , 2));
        res.status(201).json(parsedData.todos[userIndex])
    } catch (error) {
        res.status(501).json(error)
    }

});

todo.delete("/delete/:id", (req,res)=>{
    try {
        const {id} = req.params;
        const data= fs.readFileSync(filePath);
        const parsedData = JSON.parse(data);

        const userIndex = parsedData.todos.findIndex(todo=> todo.id=== parseInt(id));

        if(userIndex===-1){
            return res.status(404).json({msg:'id should not found to be deleted'})
        }
        parsedData.todos.splice(userIndex , 1);

        fs.writeFileSync(filePath , JSON.stringify(parsedData , null , 2), 'utf8');
        res.status(201).json({msg: 'todo should be updated'})
    } catch (error) {
        res.status(501).json(error)
    }
})



module.exports = todo;