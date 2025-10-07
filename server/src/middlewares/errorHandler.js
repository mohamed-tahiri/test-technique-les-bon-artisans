exports.errorHandler = (err, req, res) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Erreur serveur',
  });
};
