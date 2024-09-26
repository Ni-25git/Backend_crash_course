const mongoose = require('mongoose');

const operatorSchema = new mongoose.Schema({
    name:{type: String , unique:true , required: true},
    contact_info:{type: String , required:true , match:[/^\d{10}$/, 'Phone number must be exactly 10 digits'] },
    buses:[{type: mongoose.Schema.Types.ObjectId , ref:'Bus'}]
},{versionKey: false});

const OperatorModel = mongoose.model('Operator' , operatorSchema);

module.exports = OperatorModel