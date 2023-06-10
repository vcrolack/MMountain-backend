const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', getAllProducts);

// @route   GET api/products/:id
// @desc    Get a product by ID
// @access  Public
router.get('/:id', getProductById);

// @route   POST api/products
// @desc    Create a product
// @access  Private/Admin
router.post('/', createProduct);

// @route   PUT api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/:id', updateProduct);

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/:id', deleteProduct);

module.exports = router;
