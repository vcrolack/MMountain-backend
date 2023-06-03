const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.patch('/:id/password', usersController.updatePassword);

router
  .route('/:id')
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

router
  .route('/')
  .get(usersController.getUser)
  .post(usersController.createNewUser)
  .delete(usersController.deleteUser);



module.exports = router;
