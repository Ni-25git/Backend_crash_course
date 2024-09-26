const mongoose = require('mongoose');

const connectDB= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Db is connected with server')
    } catch (error) {
        console.log('Not Connecting Db ')
    }
};


module.exports = connectDB