const express = require('express');
const connectDB = require('./db');
const movie = require('./routes/movieRoutes');
const app= express();
const PORT = 4500;

app.use(express.json());
app.use("/movies",movie);




app.listen(PORT, async (req,res)=>{
    try {
        await connectDB();
        console.log(`server is listening on PORT${PORT} and db is connected`)
    } catch (error) {
        console.log('db is not connected',error)
    }
});