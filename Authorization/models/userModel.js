const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{type: String , unique: true , required: true , match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , 'Please valid email ']},
    password:{type:String , required: true}
},{
    versionKey: false
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;