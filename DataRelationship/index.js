const express = require('express');
const connectDB = require('./db');
const product = require('./routes/productRoutes');
const category = require('./routes/categoryRoutes');
const app= express();
const PORT = 3000;

app.use(express.json());
app.use('/product', product);
app.use('/category' , category)



app.listen(PORT , async ()=>{
try {
    await connectDB();
    console.log(`server is running on PORT ${PORT} and db is connected `)
} catch (error) {
    console.log('error is connecting db to the server')
}
})