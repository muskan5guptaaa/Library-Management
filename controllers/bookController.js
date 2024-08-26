const Book = require('../models/Book.model');

// Create a new book
exports.createBook = async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author, // Should be an author ID
        publishedDate: req.body.publishedDate,
        genre: req.body.genre,
        availableCopies: req.body.availableCopies
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all books
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('author');
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author');
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.publishedDate = req.body.publishedDate || book.publishedDate;
        book.genre = req.body.genre || book.genre;
        book.availableCopies = req.body.availableCopies || book.availableCopies;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        await book.remove();
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all books by a specific author
exports.getBooksByAuthor = async (req, res) => {
    try {
        const books = await Book.find({ author: req.params.authorId }).populate('author');
        if (books.length === 0) return res.status(404).json({ message: 'No books found for this author' });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
