const express = require('express');
const PassengerModel = require('../models/passengerModel');
const passenger = express.Router();

passenger.get("/", async (req,res)=>{
    try {
        const passenger = await PassengerModel.find();
        res.status(201).json(passenger)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
});


passenger.post('/post' , async (req,res)=>{
    try {
        const {name , email , phone , reservations} = req.body;
        const passengerDetails = new PassengerModel({name , email , phone , reservations});
        await passengerDetails.save();

        res.status(201).json({msg: 'Passenger Details added successfullyy' , passengerDetails })
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})


module.exports = passenger