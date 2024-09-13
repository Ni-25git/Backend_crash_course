const mongoose = require('mongoose');
const mongouRL = "mongodb://127.0.0.1:27017/mongooseAssignment";

const connectDb =  ()=>{
    try {
         mongoose.connect(mongouRL)
        console.log('Db is connected')
    } catch (error) {
        console.log('error in connecting Db')
    }
};


module.exports = connectDb;