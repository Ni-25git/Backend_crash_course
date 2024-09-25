const mongoose = require('mongoose');
const mongoURL = "mongodb://127.0.0.1:27017/productValidation";

const connectDB = async ()=>{
    try {
        await mongoose.connect(mongoURL);
        console.log('Db is connected to server')
    } catch (error) {
        console.log('error in connecting Db')
    }
};

module.exports= connectDB;