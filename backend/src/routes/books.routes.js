const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books.controller");

// GET /api/books
router.get("/", booksController.getBooks);

module.exports = router;
