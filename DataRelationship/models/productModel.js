const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{type: String , unique: true, required:[true , 'Name is required']},
    price:{type: Number , required: true , min:[0 , 'always greater than 0'] },
    category:{type: mongoose.Schema.Types.ObjectId , ref:'Category'},
    stock:{type:Number , default:0, required: true},
    createdAt: {type: Date , default: Date.now()}
}, {versionKey: false});

const ProductModel = mongoose.model('Product' , productSchema);

module.exports = ProductModel;