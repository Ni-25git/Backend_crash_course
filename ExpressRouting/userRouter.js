const express = require('express');
const user = express.Router();
const path = require('path');
const fs = require('fs')

const filePath = path.join(__dirname,'user.json');

user.use(express.json());

user.get('/getData',(req,res)=>{
    try {
        const data = fs.readFileSync(filePath , "utf-8");
        const parsedData = JSON.parse(data)
        res.status(201).json(parsedData.users)
    } catch (error) {
        res.status(501).json(error)
    }
})

user.post('/postData',(req,res)=>{
    try {
        
        const {name , email , password} = req.body;
        
        const data = fs.readFileSync(filePath);
        const parsedData = JSON.parse(data);

        let userIdCounter = parsedData.users.length>0 ? parsedData.users[parsedData.users.length-1].id +1 :1;

        const newUser = {id: userIdCounter , name , email , password}
        parsedData.users.push(newUser)

        fs.writeFileSync(filePath,JSON.stringify(parsedData,null,2));
        res.status(201).json(newUser)

        
    } catch (error) {
        res.status(504).json(error)
    }
});

user.patch("/update/:id",(req,res)=>{
    try {
        const {id} = req.params;
        const {name , email , password} = req.body;
        const data = fs.readFileSync(filePath);
        const parsedData= JSON.parse(data);

        const userIndex = parsedData.users.findIndex(user=>user.id===parseInt(id));

        if(userIndex===-1){
            return res.status(404).json({ error: 'User not found' });
        }
        parsedData.users[userIndex] = {
            ...parsedData.users[userIndex], // Keep existing details
            name, // Overwrite with new details
            email,
            password
          };
        fs.writeFileSync(filePath , JSON.stringify(parsedData , null ,2));
        res.status(501).json(parsedData.users[userIndex])

    } catch (error) {
        res.status(504).json(error)
    }
});

user.delete("/delete/:id",(req,res)=>{
    try {
        const {id} = req.params;
        const data= fs.readFileSync(filePath);
        const parsedData= JSON.parse(data);

        const userIndex = parsedData.users.findIndex(user=> user.id===parseInt(id));

        if(userIndex===-1){
            return res.status(400).json({msg : 'Id should not found'})
        }

        parsedData.users.splice(userIndex,1);

        fs.writeFileSync(filePath , JSON.stringify(parsedData , null ,2));
        res.status(201).json({msg: 'User delete sucessfully'})
        
    } catch (error) {
        res.status(501).json(error)
    }

})








module.exports = user;