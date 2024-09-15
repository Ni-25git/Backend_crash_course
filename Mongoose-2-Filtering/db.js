const mongoose = require('mongoose');
const mongoURL = "mongodb://127.0.0.1:27017/movieFiltering";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('DB connected successfully');
    } catch (error) {
        console.error('Error connecting to DB', error);
    }
};

module.exports = connectDB;
