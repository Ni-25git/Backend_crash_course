const express = require('express');
const ProductModel = require('../models/productModel');
const product = express.Router();


product.get("/getProduct", async (req,res)=>{
    try {
        const product = await ProductModel.find();
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({msg: error.msg});
    }
});


product.post('/post', async (req,res)=>{
    try {
       const {name , price , description} = req.body;
       const existingProduct = await ProductModel.findOne({name});
       if(existingProduct){
        return res.status(400).json({msg:'Product has already present with this name'})
       }

       const newProduct = new ProductModel({name , price , description});
       await newProduct.save()
       res.status(201).json({msg:'Product has been posted', newProduct})
    } catch (error) {
        res.status(500).json({msg: error.msg});
    }
});

product.put("/:productId" , async (req,res)=>{
    try {
        const {productId} = req.params;
        const {price , description} = req.body;

        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, {price , description});
        if(!updatedProduct){
            return res.status(400).json({msg:'product not found with this id'})
        };

        res.status(201).json({msg:'Product has been updated', updatedProduct});
    } catch (error) {
        res.status(500).json({msg: error.msg});   
    }
});

product.delete("/:productId" , async (req,res)=>{
    try {
        const {productId} = req.params;

        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        if(!deletedProduct){
            return res.status(400).json({msg:'product not found with this id'})
        };

        res.status(201).json({msg:'Product has been deleted', deletedProduct});
    } catch (error) {
        res.status(500).json({msg: error.msg});   
    }
});



module.exports = product;