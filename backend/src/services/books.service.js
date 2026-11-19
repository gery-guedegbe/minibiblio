const pool = require("../db/db");

const getAllBooks = async () => {
  // On récupère les livres et on calcule le nombre d'exemplaires disponibles
  // (Total - emprunts en cours)
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

module.exports = {
  getAllBooks,
};
