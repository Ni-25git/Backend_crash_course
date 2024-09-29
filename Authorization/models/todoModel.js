const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title:{type:String , required:true},
    description: {type: String},
    completed:{type: Boolean , default:false},
    isPublic:{type: Boolean , default:false},
    userId:{type: mongoose.Schema.Types.ObjectId , ref:'User'}
},{
    versionKey: false
});


const TodoModel = mongoose.model('Todo' , TodoSchema );

module.exports = TodoModel;