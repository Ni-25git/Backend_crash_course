const mongoose = require('mongoose');
const { Schema } = mongoose;

const librarySchema = new Schema({
    name: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    established: { type: Date, required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

module.exports = mongoose.model('Library', librarySchema);
