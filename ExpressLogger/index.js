const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const PORT = 3000;
const filePath = path.join(__dirname,'access.log');
const dataPath = path.join(__dirname,'data.json');

app.use(express.json())

const acessStream = fs.createWriteStream(filePath , {flags:'a'});

morgan.token('time',(req,res)=>{
return new Date().toLocaleString();
})

morgan.token('http-version',(req,res)=>{
    return req.httpVersion
})
app.use(morgan(':method :status :res[content-length] - :response-time ms :time HTTP/:http-version :url',{stream: acessStream}));




app.get('/',(req,res)=>{
    res.send('welcome to another assignment')
})

app.get('/get-users',(req,res)=>{
    try {
        const data = fs.readFileSync(dataPath);
        const parsedData = JSON.parse(data);
        res.status(200).json(parsedData)
    } catch (error) {
        res.status(501).json({msg: error})
    }
})


app.post('/add-user',(req,res)=>{
    try {
        const {name , email} = req.body;
        const data = fs.readFileSync(dataPath);
        const parsedData = JSON.parse(data);

        const newId = parsedData.users.length >0 ? parsedData.users[parsedData.users.length -1].id +1 : 1;

        const newUser = {id: newId , name , email};
        parsedData.users.push(newUser);

        fs.writeFileSync(dataPath , JSON.stringify(parsedData, null ,2),'utf-8');
        res.status(200).json({msg: 'user added successfully', newUser})

    } catch (error) {
        res.status(501).json({msg: error})
    }
});

app.put("/user/:id",(req,res)=>{
    try {
        const {id} = req.params;
        const {name , email} = req.body;
        const data=fs.readFileSync(dataPath);
        const parsedData = JSON.parse(data);

        const userIndex = parsedData.users.findIndex(user=> user.id===parseInt(id));

        if(userIndex===-1){
            return res.status(404).json({msg:'Id not found '})
        }

        parsedData.users[userIndex]={
            ...parsedData.users[userIndex], name , email
        }

        fs.writeFileSync(dataPath, JSON.stringify(parsedData, null , 2));
        res.status(201).json({msg: "user updated successfully" ,user: parsedData.users[userIndex]})


    } catch (error) {
        res.status(501).json({msg: error})
    }
});

app.delete("/users/:id", (req,res)=>{
    try {
        const {id} = req.params;
        const data = fs.readFileSync(dataPath);
        const parsedData = JSON.parse(data);

        const userIndex = parsedData.users.findIndex(user=> user.id=== parseInt(id));

        if(userIndex===-1){
            return res.status(404).json({msg:'Id not found '}) 
        };

        parsedData.users.splice(userIndex,1);
        fs.writeFileSync(dataPath,JSON.stringify(parsedData, null ,2),'utf-8')

        res.status(201).json({msg: "user delete successfully", users:parsedData.users})

    } catch (error) {
        res.status(501).json({msg: error})
    }
})




app.listen(PORT , (req,res)=>{
    console.log(`server is listening on PORT ${PORT}`)
})
