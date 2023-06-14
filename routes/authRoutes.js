const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/login')
  .post(authController.authUser);

router.route('/validate-token')
  .post(authController.validateToken)

router.route('/generate-token')
  .post(authController.newToken);

module.exports = router;
