const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.route('/')
  .get(getAllCategories)
  .post(createCategory);

router.route('/:id')
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
