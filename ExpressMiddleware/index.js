const express = require('express');
const app = express();
const PORT = 4500;
const path = require('path');
const fs = require('fs');

app.use(express.json());
const filePath = path.join(__dirname , 'movie.json')

const validateMiddleware=(req,res,next)=>{
    const {ID , Name , Rating , Description , Genre , Cast}= req.body;

    if(!ID || !Name || !Rating || !Description || !Genre || !Cast){
      return  res.status(400).json({msg:'bad request : Some data is incorrect'})
    };
    
    if(typeof ID !== 'number'){
        return res.status(400).json({error: 'Id should be in number'})
    }

    if(typeof Name !== 'string'){
        return res.status(400).json({error: 'Name should be in string'})
    }

    
    if(typeof Rating !== 'number'){
        return res.status(400).json({error: 'Rating should be in number'})
    }

    
    if(typeof Description !== 'string'){
        return res.status(400).json({error: 'Description should be in string'})
    }

    
    if(typeof Genre !== 'string'){
        return res.status(400).json({error: 'Genre should be in string'})
    }

    
    if(!Array.isArray(Cast) || !Cast.every(c => typeof c === 'string')){
        return res.status(400).json({error: 'cast must be an array of string'})
    }

    next();

}


app.post('/movies' , validateMiddleware , (req,res)=>{
    try {
        const {ID , Name , Description , Rating , Genre , Cast} = req.body;
        const data = fs.readFileSync(filePath);
        const parsedData = JSON.parse(data);

        const newMovie = {ID , Name , Description , Rating , Genre , Cast};

        parsedData.movies.push(newMovie);

        fs.writeFileSync(filePath , JSON.stringify(parsedData , null , 2), 'utf-8');
        res.status(200).json({msg:'data received' , newMovie})

    } catch (error) {
        res.status(400).json({error : 'invalid request body'})
    }
})

app.get('/',(req,res)=>{
    res.send('welcome to another assignment')
})








app.listen(PORT , (req,res)=>{
    console.log(`server is listening on PORT ${PORT}`)
})