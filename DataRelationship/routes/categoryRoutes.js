const express = require('express');
const CategoryModel = require('../models/categoryModel');
const ProductModel = require('../models/productModel');
const category = express.Router();

category.get("/" , async (req,res)=>{
    try {
        const category = await CategoryModel.find().populate('products')
        res.status(201).json(category)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
});

category.post("/post" , async (req,res)=>{
    try {
        const {name , description , products} = req.body;
        const category = new CategoryModel({name , description , products});
        await category.save()
        console.log(category)
        res.status(201).json({msg:'Category added successfully' , product})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
});

category.put("/update/:id" , async (req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;

        const updatedCategory = await CategoryModel.findByIdAndUpdate(id , {description});

        if(!updatedCategory){
            res.status(400).json({msg:'Category id not found'})
        }
        res.status(201).json({msg:'Description updated successfully' , updatedCategory})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
});

category.delete("/delete/:id" , async (req,res)=>{
    const {id }= req.params;
    const {deletedProducts} = req.query;
    try {
        if(deletedProducts=== 'true'){
            await ProductModel.deleteMany({category:id})
        }else{
            const uncategorizedCategory = await CategoryModel.findOne({ name: 'Uncategorized' });

            if(!uncategorizedCategory){
                const newCategory = new CategoryModel({name:'Uncategorized' , description:'Default Category for uncategorized products'});
                await newCategory.save()
                await ProductModel.updateMany({ category: id }, { $set: { category: newCategory._id } });
            }else{
                await ProductModel.updateMany({ category: id }, { $set: { category: uncategorizedCategory._id } });
            }
        }

        await CategoryModel.findByIdAndDelete(id);
        res.status(200).json({ msg: 'Category and related products handled successfully' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})


module.exports = category;