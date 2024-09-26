const express = require('express');
const RouteModel = require('../models/routeModel');
const route = express.Router();

route.get("/", async (req,res)=>{
    try {
        const route = await RouteModel.find();
        res.status(201).json(route)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
});

route.post("/post" , async (req,res)=>{
    try {
        const {start_location , end_location , distance , buses} = req.body;
        const routeDetails = new RouteModel({start_location , end_location , distance, buses});
        await routeDetails.save();
        res.status(201).json({msg: 'Route Details added successfullyy' , routeDetails })
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

route.put("/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const {start_location , end_location} = req.body
        const updatedRoute = await RouteModel.findByIdAndUpdate(id, {start_location , end_location});
        res.status(201).json({msg: ' updated successfullyy' , updatedRoute})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

route.delete("/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const deletedRoute = await RouteModel.findByIdAndDelete(id);
        res.status(201).json({msg: 'Deleted successfullyy' , deletedRoute})
        await BusModel.deleteMany({ route: id });
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});


module.exports = route