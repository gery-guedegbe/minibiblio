const pool = require("../db/db");

const createLoan = async (member_id, book_id) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Vérifier si le membre a un emprunt en retard
    const overdueCheck = await client.query(
      `SELECT id FROM loans 
       WHERE member_id = $1 AND return_date IS NULL AND due_date < CURRENT_DATE`,
      [member_id],
    );

    if (overdueCheck.rows.length > 0) {
      throw {
        status: 409,
        message: "Emprunt refusé : le membre a au moins un emprunt en retard.",
      };
    }

    // Vérifier si le membre a déjà 3 emprunts en cours
    const activeLoansCheck = await client.query(
      `SELECT COUNT(*) FROM loans WHERE member_id = $1 AND return_date IS NULL`,
      [member_id],
    );

    if (parseInt(activeLoansCheck.rows[0].count) >= 3) {
      throw {
        status: 409,
        message:
          "Emprunt refusé : le membre a déjà atteint la limite de 3 emprunts en cours.",
      };
    }

    // Vérifier la disponibilité du livre
    const bookCheck = await client.query(
      "SELECT total_copies FROM books WHERE id = $1",
      [book_id],
    );

    if (bookCheck.rows.length === 0) {
      throw { status: 404, message: "Livre introuvable." };
    }

    const activeBookLoans = await client.query(
      `SELECT COUNT(*) FROM loans WHERE book_id = $1 AND return_date IS NULL`,
      [book_id],
    );

    const availableCopies =
      bookCheck.rows[0].total_copies - parseInt(activeBookLoans.rows[0].count);
    if (availableCopies <= 0) {
      throw {
        status: 409,
        message: "Emprunt refusé : aucun exemplaire disponible pour ce livre.",
      };
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const newLoan = await client.query(
      `INSERT INTO loans (book_id, member_id, loan_date, due_date) 
       VALUES ($1, $2, CURRENT_DATE, $3) 
       RETURNING *`,
      [book_id, member_id, dueDate],
    );

    await client.query("COMMIT");

    return newLoan.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { createLoan };
