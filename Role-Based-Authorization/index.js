const express = require('express');
const connectDB = require('./db');
const user = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const product = require('./routes/productRoutes');
const cart = require('./routes/cartRoutes');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/user' , user);
app.use('/product' , product);
app.use('/cart' , cart);

// testing route

app.get('/',authMiddleware, (req,res)=>{
    res.send('welcome in testing route')
});






app.listen(PORT , async ()=>{
    try {
        await connectDB();
        console.log(`server is running on PORT ${PORT} and db is connected`)
    } catch (error) {
        console.log('error in connecting db ')
    }
});