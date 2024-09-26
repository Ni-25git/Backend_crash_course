const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    bus_number:{type: String , required:true , unique:true},
    capacity:{type: Number , required: true},
    operator :{type: mongoose.Schema.Types.ObjectId , ref:'Operator'},
    route :{type: mongoose.Schema.Types.ObjectId , ref:'Route'},
    reservations :[{type: mongoose.Schema.Types.ObjectId , ref:'Reservation'}]
}, {versionKey : false});

const BusModel = mongoose.model('Bus' , busSchema);

module.exports = BusModel;