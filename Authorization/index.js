const express = require('express');
const connectDB = require('./db');
const user = require('./routes/userRoutes');
const todo = require('./routes/todoRoutes');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;


app.use(express.json());
app.use('/user',user);
app.use('/todo' , todo);







app.listen(PORT , async ()=>{
    try {
        await connectDB()
        console.log(`server is running on PORT ${PORT} and db is connected`);
    } catch (error) {
        console.log('error in connecting db with server')
    }
})