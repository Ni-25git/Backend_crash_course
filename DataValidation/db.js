const mongoose = require('mongoose');
const mongoURL = "mongodb://127.0.0.1:27017/newAssignmentValidator";

const connectDB = async ()=>{
try {
    await mongoose.connect(mongoURL);
    console.log('db is connected')
} catch (error) {
    console.log('error in connecting db')
}
}

module.exports = connectDB;