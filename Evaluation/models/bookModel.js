const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    
    title:{type:String ,  required:true},
    ISBN:{type:String , required:true , unique:true },
    summary:{type:String },
    publicationDate:{type:Date , required:true},
    genres:[{type:String }],
    copiesAvailable :{type:Number , default:1}, 
    author : {type:mongoose.Schema.Types.ObjectId , ref:'Author'},
    borrowedBy: [{type: mongoose.Schema.Types.ObjectId , ref:'User'}],
    
},{versionKey:false});

const BookModel = mongoose.model('Book' , BookSchema);

module.exports= BookModel;