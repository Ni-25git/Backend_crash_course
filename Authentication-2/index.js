const express = require('express');
const connectDB = require('./db');
const user = require('./routes/userRoutes');
const app= express();
require('dotenv').config();
const PORT = process.env.PORT;


app.use(express.json());
app.use("/user" , user);




app.listen(PORT ,async ()=>{
    try {
        await connectDB();
        console.log(`server is running on pORT ${PORT} and db is connected`);
    } catch (error) {
        console.log('error in connecting db');
    }
})