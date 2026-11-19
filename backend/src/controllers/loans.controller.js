const loansService = require("../services/loans.service");

const createLoan = async (req, res, next) => {
  try {
    const { member_id, book_id } = req.body;

    // Validation basique côté serveur
    if (!member_id || !book_id) {
      return res
        .status(422)
        .json({ error: "Les champs member_id et book_id sont requis." });
    }

    const loan = await loansService.createLoan(member_id, book_id);

    res.status(201).json(loan);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    next(error);
  }
};

const getActiveLoans = async (req, res, next) => {
  try {
    const { member_id } = req.query;
    const loans = await loansService.getActiveLoans(member_id);
    res.status(200).json(loans);
  } catch (error) {
    next(error);
  }
};

module.exports = { createLoan, getActiveLoans };
