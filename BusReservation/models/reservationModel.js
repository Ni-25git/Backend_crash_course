const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    bus:{type: mongoose.Schema.Types.ObjectId , ref:'Reservation'},
    passenger: {type: mongoose.Schema.Types.ObjectId , ref:'Passenger'},
    seat_number:{type:Number , required:true },
    reservation_date: {type: Date , default: Date.now()}

},{versionKey: false});

const ReservationModel = mongoose.model('Reservation' , reservationSchema);

module.exports = ReservationModel;