const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name:{type:String , required:true},
    biography:{type:String },
    dateOfBirth:{type:Date },
    nationality:{type:String },
    books: [{type: mongoose.Schema.Types.ObjectId , ref:'Book'}],
    
},{versionKey:false});

const AuthorModel = mongoose.model('Author' , AuthorSchema);

module.exports= AuthorModel;