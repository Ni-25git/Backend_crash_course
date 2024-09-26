const express = require('express');
const ProductModel = require('../models/productModel');
const product = express.Router();

product.get("/" ,async  (req,res)=>{
    try {
        const product = await ProductModel.find().populate({path:'category' ,select: 'name'})
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
});

product.post("/post" , async (req,res)=>{
    try {
        const {name , price , stock , category  } = req.body;
        const product = new ProductModel({name, price , stock, category});
        await product.save()

        res.status(201).json({msg:'Product added successfully' , product})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
});

product.get("/:id" , async (req,res)=>{
    try {
    const {id} = req.params;
    const product = await ProductModel.findById(id).populate({path:'category' , select:'name'});
    if(!product){
        res.status(404).json({msg:'Product not found'})
    }
    res.status(201).json(product)
    }catch(error){
        res.status(500).json({msg: error.message})
    }
} );

product.put("/update/:id" , async (req,res)=>{
    try {
        const {id} = req.params;
        const {price , stock , category} = req.body;
        const updatedProduct = await ProductModel.findByIdAndUpdate(id , {price , stock , category});

        if(!updatedProduct){
            res.status(404).json({msg:'Product not found'})
        }

        res.status(201).json({msg:'Product updated succesfully' , updatedProduct})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
});

product.delete("/delete/:id" , async (req,res)=>{
    try {
        const {id} = req.params;
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        
        res.status(201).json({msg:'Product deleted succesfully' , deletedProduct})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})


module.exports = product