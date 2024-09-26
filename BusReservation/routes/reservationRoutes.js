const express = require('express');
const ReservationModel = require('../models/reservationModel');
const BusModel = require('../models/busModel');
const reservation = express.Router();

reservation.get("/", async (req,res)=>{
    try {
        const reservation = await ReservationModel.find();
        res.status(201).json(reservation)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
});


reservation.post('/post' , async (req,res)=>{
    try {
        const {bus , passenger , seat_number , reservation_date} = req.body;
        const reservationDetails = new ReservationModel({bus , passenger , seat_number , reservation_date});
        await reservationDetails.save();

        res.status(201).json({msg: 'Passenger Details added successfullyy' , reservationDetails })
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

reservation.put("/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const {seat_number} = req.body
        const updatedReservation = await ReservationModel.findByIdAndUpdate(id, {seat_number});
        res.status(201).json({msg: 'updated successfullyy' ,updatedReservation })
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});



reservation.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedReservation = await ReservationModel.findByIdAndDelete(id);

        res.status(200).json({msg:'This seat-number is availabel', deletedReservation});
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


module.exports = reservation