const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {type:String , required: true},
    price : {type:Number , required: true},
    description : {type:String , required: true},

},{versionKey:false});

const ProductModel = mongoose.model('product', productSchema);

module.exports = ProductModel;