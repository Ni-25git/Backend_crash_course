const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{type:String , unique:true , required:true},
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true},
    name:{type:String , required:true},
    role:{type:String , enum:['Admin' , 'Member'] , default:'Member'},
    borrowedBooks: [{type: mongoose.Schema.Types.ObjectId , ref:'Book'}],
    
},{versionKey:false});

const UserModel = mongoose.model('User' , UserSchema);

module.exports= UserModel;