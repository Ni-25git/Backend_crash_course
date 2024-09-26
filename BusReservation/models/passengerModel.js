const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    name:{type: String , required:true},
    email: {type: String , required: true , unique:true , match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email']},
    phone:{type:Number , required:true , match:[/^\d{10}$/, 'Phone number must be exactly 10 digits']},
    reservations: [{type: mongoose.Schema.Types.ObjectId , ref:'Reservation'}]

},{versionKey: false});

const PassengerModel = mongoose.model('Passenger' , passengerSchema);

module.exports = PassengerModel;