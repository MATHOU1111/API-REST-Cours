require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('La variable MONGODB_URI est obligatoire.');
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`API démarrée sur http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Connexion MongoDB impossible.', error);
    process.exit(1);
  });
