const express = require('express');
const connectDB = require('./db');
const user = require('./routes/userRoutes');
const app = express();
const PORT = 4500;

app.use(express.json());
app.use("/user" , user)


app.get("/" , (req,res)=>{
    res.send("welcome")
})




app.listen(PORT , async ()=>{
    try {
        await connectDB()
        console.log(`server is listening on PORT ${PORT} and db is connected`)
    } catch (error) {
        console.log('error in connecting db with server')
    }
})