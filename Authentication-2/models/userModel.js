const mongoose = require('mongoose');

const userSchema = new  mongoose.Schema({
    email:{type:String , required:true, unique:true , match:[ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , 'Please valid email ']},
    password:{type:String , required:true},
    dob:{type: Date },
    mobileNumber:{type:String , match: [/^\d{10}$/, 'Please provide a valid 10-digit mobile number'] },
},{
    versionKey:false,
    timestamps:true
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;