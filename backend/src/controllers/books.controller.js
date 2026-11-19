const booksService = require("../services/books.service");

const getBooks = async (req, res, next) => {
  try {
    const books = await booksService.getAllBooks();
    // 200 OK
    res.status(200).json(books);
  } catch (error) {
    // Passe l'erreur au middleware errors.js
    next(error);
  }
};

module.exports = {
  getBooks,
};
