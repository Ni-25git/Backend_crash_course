const express = require('express');
const connectDB = require('./config/db');
const user = require('./routes/userRoutes');
const author = require('./routes/authorRoutes');
const book = require('./routes/bookRoutes');
const borrow = require('./routes/borrowRoutes');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api" , user);
app.use("/api/authors" , author);
app.use('/api/books' , book);
app.use('/api/borrowings' , borrow)





app.listen(PORT , async ()=>{
    try {
        await connectDB();
        console.log(`server is listening on PORT ${PORT}`)
    } catch (error) {
        console.log('Error in connecting db',error)
    }
});