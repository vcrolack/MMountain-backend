const express = require('express');
const router = express.Router();
const customersController = require('../controllers/commonController');

router.route('/')
  .get(customersController.getCustomers)
  .post(customersController.createCustomer)

router.route('/:id')
  .get(customersController.getCustomer)
  .patch(customersController.updateCustomer)
  .delete(customersController.deleteCustomer);

module.exports = router;
