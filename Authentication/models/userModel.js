const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{type: String , unique: true, required: true},
    email: {type: String , required:true, match:[ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , 'Please valid email ']},
    password: {type:String , required: true},
    encryptedMessage: {type: String},
    iv:{type:String},
    hashedMessage:{type:String},
},{
    versionKey: false,
    timestamps: true
});

const UserModel = mongoose.model('User' , userSchema);

module.exports = UserModel;