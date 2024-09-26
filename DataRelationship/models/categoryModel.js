const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{type: String , unique:true , required: true},
    description:{type: String , required: true},
    products:[{type: mongoose.Schema.Types.ObjectId , ref:'Product'}]
},{versionKey: false});


const CategoryModel = mongoose.model('Category' , categorySchema);

module.exports= CategoryModel