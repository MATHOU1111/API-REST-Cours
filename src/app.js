const express = require('express');
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);

app.use((request, response) => {
  response.status(404).json({ error: 'Route introuvable.' });
});

app.use((error, request, response, next) => {
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return response.status(400).json({
      error: 'Données du produit invalides.',
      details: error.message
    });
  }

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return response.status(400).json({ error: 'JSON invalide.' });
  }

  console.error(error);
  response.status(500).json({ error: 'Erreur interne du serveur.' });
});

module.exports = app;
