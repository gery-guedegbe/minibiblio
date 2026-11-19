const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || "Une erreur interne est survenue.";

  res.status(status).json({ error: message });
};

module.exports = errorHandler;
