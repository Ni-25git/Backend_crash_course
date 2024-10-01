const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    buyerId:{type:mongoose.Schema.Types.ObjectId , ref:'User' , required:true},
    products:[{product:{type:mongoose.Schema.Types.ObjectId , ref:'Product',required:true}, 
        quantity:{type:Number , required:true}
    }
    ],
    totalCartValue:{type:Number},

},{
    versionKey: false
});

const CartModel = mongoose.model('Cart' , cartSchema);

module.exports = CartModel