const express = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/books.routes");
const loanRoutes = require("./routes/loans.routes");
const errorHandler = require("./errors");

const app = express();

// Middlewares
app.use(cors()); // Autorise le front à faire des requêtes
app.use(express.json()); // Permet de lire le JSON dans les requêtes POST/PUT

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/loans", loanRoutes);

// Middleware de gestion d'erreurs
app.use(errorHandler);

module.exports = app;
