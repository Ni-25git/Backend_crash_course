const mongoose = require('mongoose');


const connectDB= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Db is connected')
    } catch (error) {
        console.log('Db is not connected')
    }
};


module.exports = connectDB