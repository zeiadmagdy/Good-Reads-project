const express = require("express");
const router = express.Router();
const { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require("../controllers/authorsController");



router.get("/", getAllAuthors);

router.get("/:id", getAuthorById);

router.post("/", createAuthor);

router.put("/:id", updateAuthor);

router.delete("/:id", deleteAuthor);



module.exports = router;