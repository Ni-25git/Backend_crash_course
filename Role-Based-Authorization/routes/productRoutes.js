const express = require('express');
const ProductModel = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');
const checkAccess = require('../middleware/checkAccess');
const product = express.Router();

product.get('/' ,authMiddleware,checkAccess('admin') , async (req,res)=>{
    try {
        const product = await ProductModel.find();
        res.status(201).json(product)
        
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});

product.post('/addproduct' ,authMiddleware,checkAccess('admin'), async (req,res)=>{
    try {
        const {name , description , price , quantity , sellerId} = req.body;

        const product = new ProductModel({name , description , price , quantity , sellerId});
        await product.save();
        res.status(201).json({msg:'Product added successfully' , product});
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});

product.put('/:productId' ,authMiddleware , checkAccess('admin'), async (req,res)=>{
    try {
        const {productId} = req.params;
        const {name , description , price , quantity , sellerId} = req.body;
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId,{name , description , price , quantity , sellerId});


        res.status(201).json({msg:'Product updated successfully' , updatedProduct})
        
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});


product.delete('/:productId' ,authMiddleware , checkAccess('admin'), async (req,res)=>{
    try {
        const {productId} = req.params;
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);


        res.status(201).json({msg:'Product deleted successfully' , deletedProduct})
        
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});

product.get("/seller" ,authMiddleware, checkAccess('seller'), async (req,res)=>{
    try {
    

        const sellerId = req.user.id;
        

        const product = await ProductModel.find({sellerId}).populate({path:'sellerId' , select:'email'});
        res.status(201).json( product);
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});

product.post("/addproduct/seller" ,authMiddleware, checkAccess('seller'), async (req,res)=>{
    try {
    
        const {name , description , price , quantity } = req.body;

        const sellerId = req.user.id;
        

        const product = new ProductModel({name , description , price , quantity ,sellerId});
        res.status(201).json({msg:'Product added successfully' , product});
        await product.save();
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});

product.put("/update/:productId" ,authMiddleware, checkAccess('seller'), async (req,res)=>{
    try {
        
        const sellerId = req.user.id;
        const {productId} = req.params
        const {name , description , price , quantity } = req.body;
        
        
        
        const product = await ProductModel.findByIdAndUpdate(productId,{name , description , price , quantity ,sellerId});
        
                if (!product) {
                    return res.status(404).json({ msg: 'Product not found or not owned by seller' });
                }
        res.status(201).json({msg:'Product updated successfully' , product});
        await product.save();
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});

product.delete("/update/:productId" ,authMiddleware, checkAccess('seller'), async (req,res)=>{
    try {
        
        const {productId} = req.params
        
        
        
        const product = await ProductModel.findByIdAndDelete(productId);
        
                if (!product) {
                    return res.status(404).json({ msg: 'Product not found or not owned by seller' });
                }
        res.status(201).json({msg:'Product deleted successfully' , product});
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});



module.exports = product;