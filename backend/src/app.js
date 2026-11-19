const express = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/books.routes");
const errorHandler = require("./errors"); // On le créera juste après

const app = express();

// Middlewares
app.use(cors()); // Autorise le front à faire des requêtes
app.use(express.json()); // Permet de lire le JSON dans les requêtes POST/PUT

// Routes
app.use("/api/books", bookRoutes);

// Middleware de gestion d'erreurs
app.use(errorHandler);

module.exports = app;
