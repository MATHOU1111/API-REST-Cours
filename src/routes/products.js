const express = require('express');
const productsController = require('../controllers/productsController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/:id', productsController.getProduct);
router.post('/', requireAuth, productsController.createProduct);
router.patch('/:id', requireAuth, productsController.updateProduct);
router.put('/:id', requireAuth, productsController.replaceProduct);
router.delete('/:id', requireAuth, productsController.deleteProduct);

module.exports = router;
