const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{type:String , unique:true , required:true , match:[   /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please write a valid email']},
    password:{type:String ,required: true},
    role:{type: String , enum:['admin' , 'seller' , 'buyer']},

},{
    versionKey:false
});

const UserModel = mongoose.model('User' , UserSchema);

module.exports = UserModel