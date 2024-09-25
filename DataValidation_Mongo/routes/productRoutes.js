const express = require('express');
const ProductModel = require('../models/productModel');
const product = express.Router();

product.use(express.json());


product.get("/", (req, res) => {
    res.send('Welcome to product routes');
});


product.post("/post", async (req, res) => {
    try {
        const { productName, price, category, stock, SKU, tags } = req.body;
        
        
        const product = new ProductModel({ productName, price, category, stock, SKU, tags });
        
    
        await product.save();
        
    
        res.status(201).json({ msg: 'Product added successfully', product });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ errors });
        } else {
            res.status(500).json({ msg: error.message });
        }
    }
});


product.get("/all", async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


product.get("/:id", async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// UPDATE: PUT request to update a product by ID
product.put("/:id", async (req, res) => {
    try {
        const { productName, price, category, stock, SKU, tags } = req.body;

        // Find the product by ID and update it with new values
        const product = await ProductModel.findByIdAndUpdate(
            req.params.id,
            { productName, price, category, stock, SKU, tags },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.status(200).json({ msg: 'Product updated successfully', product });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ errors });
        } else {
            res.status(500).json({ msg: error.message });
        }
    }
});

// DELETE: DELETE a product by ID
product.delete("/:id", async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.status(200).json({ msg: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

module.exports = product;
