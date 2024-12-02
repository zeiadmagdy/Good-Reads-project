const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { getAllBooks, getBookById, createBook, updatedBook, deleteBook } = require("../controllers/bookController")



router.get("/", getAllBooks);


router.get("/:id", getBookById);


router.post("/", createBook);


router.put("/:id", updatedBook);


router.delete("/:id", deleteBook);



module.exports = router;
