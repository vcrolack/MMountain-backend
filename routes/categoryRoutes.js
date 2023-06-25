const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoryController');
const { verifyToken } = require('../middleware/verifyToken');
const { verifyRole } = require('../middleware/verifyRole');

router.route('/')
  .get(categoriesController.getAllCategories)
  .post(verifyToken, verifyRole(['superuser', 'maintainer']), categoriesController.createCategory);

router.route('/:id')
  .get(categoriesController.getCategoryById)
  .put(verifyToken, verifyRole(['superuser', 'maintainer']), categoriesController.updateCategory)
  .delete(verifyToken, verifyRole(['superuser', 'maintainer']), categoriesController.deleteCategory);

module.exports = router;
