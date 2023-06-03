const express = require('express');

const router = express.Router();
const commonController = require('../controllers/commonController');

router.route('/validate-token')
  .post(commonController.validateToken)

module.exports = router;
