const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyRole } = require('../middleware/verifyRole');
const { verifyToken } = require('../middleware/verifyToken');

router.route('/products-with-stock')
  .get(productController.getProductsWithStock);

router.route('/')
  .get(productController.getAllProducts);

router.route('/:id')
  .get(productController.getProductById);

router.route('/')
  .post(verifyToken, verifyRole(['maintainer', 'superuser']), productController.createProduct);

router.route('/:id')
  .patch(verifyToken, verifyRole(['maintainer', 'superuser']), productController.updateProduct)
  .delete(verifyToken, verifyRole(['maintainer', 'superuser']), productController.deleteProduct);

module.exports = router;
