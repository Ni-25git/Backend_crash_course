const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    published_year: { type: Number, required: true },
    genre: { type: String, required: true },
    library: { type: mongoose.Schema.Types.ObjectId, ref: 'Library', required: true }
});

module.exports = mongoose.model('Book', bookSchema);
