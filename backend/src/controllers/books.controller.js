const booksService = require("../services/books.service");

const getBooks = async (req, res, next) => {
  try {
    const books = await booksService.getAllBooks();

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

const createBook = async (req, res, next) => {
  try {
    const { title, author, isbn, total_copies } = req.body;

    // Vérifier si l'ISBN existe déjà

    const newBook = await booksService.createBook(
      title,
      author,
      isbn,
      total_copies,
    );

    res.status(201).json(newBook);
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ error: "Cet ISBN existe déjà dans la bibliothèque." });
    }

    next(error);
  }
};

module.exports = {
  getBooks,
  createBook,
};
