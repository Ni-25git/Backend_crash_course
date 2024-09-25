const express = require('express');
const connectDB = require('./db'); // importing routes
const product = require('./routes/productRoutes');

const app = express();
app.use(express.json());
const PORT = 5500;

// Middleware to parse JSON

// Routes
app.use("/product", product); // Use the product routes

// Test Route
app.get("/get", (req, res) => {
    res.send("Welcome to the index.js route");
});

// Starting the server
app.listen(PORT, async (req,res) => {
    try {
        await connectDB(); // Connecting to the database
        console.log(`Server is listening on PORT ${PORT}`);
    } catch (error) {
        console.log('Database is not connected:', error);
    }
});
