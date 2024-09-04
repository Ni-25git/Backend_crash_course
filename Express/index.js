const express = require('express');
const PORT = 3000;
const app = express();

app.get('/', (req,res)=>{
res.send('Welcome to the Express.js Server.')
});

app.get('/about', (req,res)=> {
    res.send('This is a simple web server built using Express.js.')
});

app.get('/contact', (req,res)=> {
    res.json({
         email: "student@example.com",
        phone: "123-456-7890"
    });
});

app.get('/random', (req,res)=> {
const randomNumber = Math.floor(Math.random() * 100) + 1;
res.send(`Your random number is: ${randomNumber}`)
})


app.use((req, res) => {
    res.status(404).send('404 Page Not Found: Test your server');
});






app.listen(PORT, (req,res)=>{
    console.log(`Server is running on port ${PORT}`)
})