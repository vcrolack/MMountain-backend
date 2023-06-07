const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customersController');

router.route('/')
  .get(customersController.getAllCustomers)
  .post(customersController.createCustomer)

router.route('/:id')
  .get(customersController.getCustomer)
  .patch(customersController.updateCustomer)
  .delete(customersController.deleteCustomer);

module.exports = router;
