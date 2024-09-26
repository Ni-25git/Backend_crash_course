const express = require('express');
const BusModel = require('../models/busModel');
const bus = express.Router();

bus.get("/", async (req,res)=>{
    try {
        const bus = await BusModel.find().populate({path:'operator' , select: 'name , contact_info'}).populate({path: 'route', select:'start_location , end_location , distance'}).populate({path:'reservations'});
        res.status(201).json(bus)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
});

bus.post("/post" , async (req,res)=>{
    try {
        const {bus_number , capacity , operator , route, reservations } = req.body;
        const busDetails = new BusModel({bus_number , capacity , operator , route , reservations});
        await busDetails.save();

        res.status(201).json({msg:'Bus Details added successfully ' , busDetails})
        
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
});

bus.put("/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const {capacity, route} = req.body
        const updatedBus = await BusModel.findByIdAndUpdate(id, {capacity , route});
        res.status(201).json({msg: 'updated successfullyy' , updatedBus})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});


module.exports = bus;