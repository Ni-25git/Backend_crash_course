const express = require('express');
const cart = express.Router();
const checkAccess = require('../middleware/checkAccess');
const authMiddleware = require('../middleware/authMiddleware');
const ProductModel = require('../models/Product');
const CartModel = require('../models/Cart');

cart.get('/' ,  (req,res)=>{
    res.send('welcome in cart routes')
});

cart.post('/add', authMiddleware, checkAccess('buyer'), async (req, res) => {
    try {
        const buyerId = req.user.id;
        const { productId, quantity } = req.body;


        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        let cart = await CartModel.findOne({ buyerId });

        if (!cart) {
            cart = new CartModel({ buyerId, products: [], totalCartValue: 0 });
        }

    
        const existingProductIndex = cart.products.findIndex(item => item.product.toString() === productId);

        if (existingProductIndex > -1) {
            
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            
            cart.products.push({ product: productId, quantity });
        }

        
        cart.totalCartValue += product.price * quantity;

        await cart.save();
        res.status(201).json({ msg: 'Product added to cart', cart });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


cart.delete('/remove' , authMiddleware , checkAccess('buyer') , async (req,res)=>{
    try {
        const {productId} = req.body;
        const buyerId = req.user.id;
        
        const cart = await CartModel.findOne({buyerId });
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ msg: 'Product not found in cart' });
        }

        const quantity = cart.products[productIndex].quantity;
        const product = await ProductModel.findById(productId);
        cart.totalCartValue -= product.price * quantity;

        cart.products.splice(productIndex, 1);
        await cart.save();

        res.status(200).json({ msg: 'Product removed from cart', cart });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


module.exports = cart;