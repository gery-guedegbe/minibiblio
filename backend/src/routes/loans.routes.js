const express = require("express");
const router = express.Router();
const loansController = require("../controllers/loans.controller");

router.post("/", loansController.createLoan);

module.exports = router;
