const asyncHandler = require("express-async-handler");
const { Book, validateBook, validateUpdateBook } = require("../models/Book");



/** 
@desc: get all books
@route /api/books
@method GET
@access public

*/
const getAllBooks = asyncHandler(async (req, res) => {
    const { pageNumber } = req.query;
    const authorsPerPage = 10;

    const books = await Book.find().populate("author", [
        "_id",
        "firstName",
        "lastName",
    ])
        .skip((pageNumber - 1) * authorsPerPage)
        .limit(authorsPerPage);;

    res.status(200).json(books);
});


/** 
@desc: get book by id 
@route /api/books/:id
@method GET
@access public

*/
const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author");
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});


/**
 * @desc: Create new book
 * @route /api/books
 * @method POST
 * @access public
 */

const createBook = asyncHandler(async (req, res) => {
    const { error } = validateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating,
        Category: req.body.category,
        image: req.body.image,
        reviews: req.body.reviews
    });

    const result = await book.save();
    res.status(201).json(result);
});


/**
 * @desc: Update book
 * @route /api/books/:id
 * @method PUt
 * @access public
 */

const updatedBook = asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                price: req.body.price,
                rating: req.body.rating,
                Category: req.body.category,
                image: req.body.image,
                reviews: req.body.reviews
            },
        },
        { new: true }
    );

    res.status(200).json(updatedBook);
});


/**
 * @desc: Delete book
 * @route /api/books/:id
 * @method DELETE
 * @access public
 */


const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Book Deleted successfully" });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updatedBook,
    deleteBook
}