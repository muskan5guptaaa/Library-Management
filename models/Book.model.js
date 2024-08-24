const mongoose = require('mongoose');
const Author = require('./Author.model');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    PublishedDate: {
        type: Date
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    availableCopies: {
        type: Number,
        default: 1
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
