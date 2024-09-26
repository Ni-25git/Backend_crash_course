const mongoose = require('mongoose');
const mongoUri = "mongodb+srv://nipunsehrawat_25:nipun123@cluster0.hdihp.mongodb.net/"

const connectDB= async ()=>{
    try {
        await mongoose.connect(mongoUri)
        console.log('db is connected ')
    } catch (error) {
        console.log('db is not connected')
    }
}

module.exports = connectDB;