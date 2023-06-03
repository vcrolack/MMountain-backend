const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.route('/')
  .get(usersController.getUser)
  .post(usersController.createNewUser)

router.route('/:id')
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

router.patch('/:id/password', usersController.updatePassword);

module.exports = router;
