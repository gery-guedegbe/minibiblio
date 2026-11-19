const pool = require("../db/db");

const getAllBooks = async () => {
  // Récupère les livres et calcule le nombre d'exemplaires disponibles
  const query = `
    SELECT 
      b.id, 
      b.title, 
      b.author, 
      b.isbn, 
      b.total_copies,
      (b.total_copies - COUNT(l.id)) AS available_copies
    FROM books b
    LEFT JOIN loans l ON b.id = l.book_id AND l.return_date IS NULL
    GROUP BY b.id
    ORDER BY b.id DESC;
  `;

  const result = await pool.query(query);

  return result.rows;
};

const createBook = async (title, author, isbn, total_copies) => {
  const query = `
    INSERT INTO books (title, author, isbn, total_copies) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *
  `;
  const values = [title, author, isbn, total_copies];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  getAllBooks,
  createBook,
};
