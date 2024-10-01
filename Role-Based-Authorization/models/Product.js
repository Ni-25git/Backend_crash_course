const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{type:String , required:true , unique:true},
    description:{type: String },
    price:{type:Number , required:true},
    quantity:{type:Number , required:true},
    sellerId:{type: mongoose.Schema.Types.ObjectId , ref:'User' , required:true},
},{
    versionKey:false
});

const ProductModel = mongoose.model('Product' , productSchema);

module.exports = ProductModel;