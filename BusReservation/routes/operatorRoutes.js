const express = require('express');
const OperatorModel = require('../models/operatorModel');
const BusModel = require('../models/busModel');
const operator = express.Router();

operator.get("/:id/buses", async (req,res)=>{
    try {
        const {id}= req.params
        const operator = await OperatorModel.findById(id).populate({path:'buses'});
        res.status(201).json(operator)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
});

operator.post('/post' , async (req,res)=>{
    try {
        const {name , contact_info , buses } = req.body;
        const operatorDetails = new OperatorModel({name , contact_info, buses});
        await operatorDetails.save();

        res.status(201).json({msg: 'Operator Details added successfullyy' , operatorDetails })
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

operator.put("/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const {contact_info} = req.body
        const updatedOperator = await OperatorModel.findByIdAndUpdate(id, {contact_info});
        res.status(201).json({msg: 'Contact Info updated successfullyy' , updatedOperator})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

operator.delete("/delete/:id/:busId" , async (req,res)=>{
    try {
        const {id , busId} = req.params;
        const operator = await OperatorModel.findById(id);

        if (!operator) {
            return res.status(404).json({ msg: 'Operator not found' });
        }

        operator.buses = operator.buses.filter(bus=> bus.toString() !== busId);
        await operator.save();
        res.status(201).json({msg: 'Bus delted from opeartor successfullyy' , operator})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

operator.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const operator = await OperatorModel.findById(id);


        if (!operator) {
            return res.status(404).json({ msg: 'Operator not found' });
        }

        const buses = await BusModel.find({ operator: id });

    
        for (let bus of buses) {
            await ReservationModel.deleteMany({ bus: bus._id });

            await BusModel.findByIdAndDelete(bus._id);
        }


        await OperatorModel.findByIdAndDelete(id);

        res.status(200).json({
            msg: `Operator, associated buses, and reservations have been deleted successfully.`,
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});





module.exports = operator