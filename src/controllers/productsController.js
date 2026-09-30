const mongoose = require('mongoose');
const Product = require('../models/Product');

function validateId(id, response) {
  if (!mongoose.isValidObjectId(id)) {
    response.status(400).json({ error: 'Identifiant de produit invalide.' });
    return false;
  }

  return true;
}

async function listProducts(request, response, next) {
  try {
    const products = await Product.find();
    response.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

//
async function getProduct(request, response, next) {
  if (!validateId(request.params.id, response)) return;

  try {
    const product = await Product.findById(request.params.id);
    if (!product) {
      return response.status(404).json({ error: 'Produit introuvable.' });
    }

    response.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

async function createProduct(request, response, next) {
  try {
    const product = await Product.create(request.body);
    response.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(request, response, next) {
  if (!validateId(request.params.id, response)) return;

  try {
    const product = await Product.findByIdAndUpdate(
      request.params.id,
      { $set: request.body },
      { new: true, runValidators: true }
    );

    if (!product) {
      return response.status(404).json({ error: 'Produit introuvable.' });
    }

    response.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

async function replaceProduct(request, response, next) {
  if (!validateId(request.params.id, response)) return;

  try {
    const product = await Product.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true, overwrite: true }
    );

    if (!product) {
      return response.status(404).json({ error: 'Produit introuvable.' });
    }

    response.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(request, response, next) {
  if (!validateId(request.params.id, response)) return;

  try {
    const product = await Product.findByIdAndDelete(request.params.id);
    if (!product) {
      return response.status(404).json({ error: 'Produit introuvable.' });
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  replaceProduct,
  deleteProduct
};
