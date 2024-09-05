const express = require('express');
const app=express();
const PORT = 4500;
const fs = require('fs');
const path = require('path')

app.use(express.json());



app.get('/',(req,res)=>{
    res.send('Welcome nipun')
});

app.get("/todos",(req,res)=>{
    try {
        const filePath = path.join(__dirname,"db.json");
        const data = fs.readFileSync(filePath);
        res.status(201).send(data)
    } catch (error) {
        res.status(501).json({error})
    }
})

app.post("/addTodo",(req,res)=>{
    try {
        const {name , status} = req.body;
        const filePath =  path.join(__dirname,"db.json");
        const data = fs.readFileSync(filePath);
        const parsedData = JSON.parse(data)
        const newId = Math.max(0,...parsedData.todos.map(todo=> todo.id))+1;
        while(parsedData.todos.some(todo=>todo.id===newId)){
            newId++;
        }
        const newTodo = {id: newId , name , status};
        parsedData.todos.push(newTodo)

        fs.writeFileSync(filePath,JSON.stringify(parsedData , null ,2));
        res.status(201).json(newTodo)
    } catch (error) {
     res.status(501).json({msg: "error in posting"})   
    }
});

app.patch("/updateTodos", (req, res) => {
    try {
        const filePath = path.join(__dirname, "db.json");
        const data = fs.readFileSync(filePath);
        const parsedData = JSON.parse(data);

        let updatedCount = 0;

        parsedData.todos.forEach(todo => {
            if (todo.id % 2 === 0 && todo.status === false) {
                todo.status = true;
                updatedCount++;
            }
        });

        if (updatedCount > 0) {
            fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2));
            return res.status(200).json({ msg: `${updatedCount} todos updated to status true` });
        } else {
            return res.status(400).json({ msg: "No todos were updated. Either no todo had an even id or all todos with even ids were already true." });
        }

    } catch (error) {
        res.status(501).json({ error });
    }
});


app.delete("/delete",(req,res)=>{
    try {
        const filePath = path.join(__dirname,"db.json");
        const data = fs.readFileSync(filePath);
        const parsedData = JSON.parse(data);

        const todo = parsedData.todos.filter(todo => todo.status!==true);
        parsedData.todos = todo;

        fs.writeFileSync(filePath, JSON.stringify(parsedData,null,2));
        res.status(201).json({msg:'todo has been deleted'})
    } catch (error) {
        res.status(501).json({msg: 'error'})
    }
})




app.listen(PORT, ()=>{
    console.log(`server is listening on ${PORT}`)
});