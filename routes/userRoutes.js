const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { verifyToken } = require('../middleware/verifyToken');
const {verifyRole} = require('../middleware/verifyRole');

router.route('/')
  .get(verifyToken, verifyRole(['maintainer', 'superuser']), usersController.getAllUsers)
  .post(verifyToken, verifyRole(['superuser', 'maintainer']), usersController.createNewUser)

router.route('/:id')
  .get(verifyToken, verifyRole(['maintainer', 'superuser']), usersController.getUser)
  .patch(verifyToken, verifyRole(['maintainer', 'superuser']),usersController.updateUser)
  .delete(verifyToken, verifyRole(['maintainer', 'superuser']), usersController.deleteUser);

router.patch('/:id/password', verifyToken, verifyRole(['customer']), usersController.updatePassword);

module.exports = router;
