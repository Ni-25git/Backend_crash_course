const express = require('express');
const connectDb = require('./db');
const user = require('./routes/userRoutes');
const product = require('./routes/productRoutes');
const app= express();
const PORT = 8000;

app.use(express.json());
app.use("/user", user);
app.use("/product",product );



app.get("/", (req,res)=>{
    res.send('welcome to mongoose assignment')
})







app.listen(PORT , async (req,res)=>{
    try {
        await connectDb()
        console.log(`server is listening on PORT ${PORT} and db is connected`)
    } catch (error) {
        console.log('error in connecting db with server')
    }
})