const express = require("express");
const router = express.Router();
const loansController = require("../controllers/loans.controller");

router.post("/", loansController.createLoan);
router.get("/active", loansController.getActiveLoans);

module.exports = router;
