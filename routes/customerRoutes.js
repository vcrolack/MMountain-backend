const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customersController');
const { verifyToken } = require('../middleware/verifyToken');
const {verifyRole} = require('../middleware/verifyRole');

router.route('/')
  .get(verifyToken, verifyRole(['superuser', 'maintainer']),customersController.getAllCustomers)
  .post(verifyToken, verifyRole(['superuser', 'maintainer']), customersController.createCustomer)

router.route('/:id')
  .get(verifyToken, verifyRole(['superuser', 'maintainer']), customersController.getCustomer)
  .patch(verifyToken, verifyRole(['superuser', 'maintainer']), customersController.updateCustomer)
  .delete(verifyToken, verifyRole(['superuser', 'maintainer']), customersController.deleteCustomer);

module.exports = router;
