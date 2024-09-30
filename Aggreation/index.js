const express = require('express');
const Library = require('./model/library.js');
const Book = require('./model/book.js');
const connectDB = require('./db.js');
require('dotenv').config()
const PORT = process.env.PORT;

const app = express();
app.use(express.json());



// Create a new library
app.post('/libraries', async (req, res) => {
    try {
        const { name, location, established } = req.body;
        const library = new Library({
            name,
            location,
            established
        });
        await library.save();
        res.status(201).send(library);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Add a book to a library
app.post('/libraries/:libraryId/books', async (req, res) => {
    try {
        const { title, author, published_year, genre } = req.body;
        const book = new Book({
            title,
            author,
            published_year,
            genre,
            library: req.params.libraryId
        });
        await book.save();

        const library = await Library.findById(req.params.libraryId);
        library.books.push(book._id);
        await library.save();

        res.status(201).send(book);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all books in a specific library with optional filtering
app.get('/libraries/:libraryId/books', async (req, res) => {
    try {
        const { genre, author } = req.query;
        const match = {};
        if (genre) match.genre = genre;
        if (author) match.author = author;

        const books = await Book.find({ library: req.params.libraryId, ...match });
        res.status(200).send(books);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get detailed info about a book
app.get('/books/:bookId', async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId).populate('library');
        res.status(200).send(book);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get libraries with books by a particular author
app.get('/libraries/books/author/:author', async (req, res) => {
    try {
        const libraries = await Library.aggregate([
            {
                $lookup: {
                    from: 'books',
                    localField: 'books',
                    foreignField: '_id',
                    as: 'bookDetails'
                }
            },
            { $unwind: '$bookDetails' },
            { $match: { 'bookDetails.author': req.params.author } }
        ]);
        res.status(200).send(libraries);
    } catch (err) {
        res.status(500).send(err);
    }
});


app.listen(PORT, async () => {
    try {
        await connectDB()
        console.log(`Server is running on port ${PORT} and db is connected`);
        
    } catch (error) {
        console.log('error in connecting db')
    }
});
