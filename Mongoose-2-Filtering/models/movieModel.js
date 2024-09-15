const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name:{type:String , required:true},
    title:{type:String , required:true},
    rating:{type:Number , required:true},
    description:{type:String , required:true},
},{versionKey:false});

const MovieModel = mongoose.model('Movie', movieSchema);


module.exports= MovieModel;