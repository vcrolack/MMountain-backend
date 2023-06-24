const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { verifyToken } = require('../middleware/verifyToken');
const {verifyRole} = require('../middleware/verifyRole');

/* RUTAS PARA SUPERUSER Y MAINTAINER */
router.route('/')
  .post(usersController.createNewUser)
  .get(verifyToken, verifyRole(['maintainer', 'superuser']), usersController.getAllUsers)

router.route('/:id')
  .get(verifyToken, verifyRole(['maintainer', 'superuser']), usersController.getUser)
  .patch(verifyToken, verifyRole(['maintainer', 'superuser']),usersController.updateUser)
  .delete(verifyToken, verifyRole(['maintainer', 'superuser']), usersController.deleteUser);

/* RUTAS PARA CUSTOMER */
router.patch('/customer/:id/password', verifyToken, verifyRole(['superuser', 'maintainer', 'customer']), usersController.updatePassword);

router.route('/customer/profile/:id')
  .get(verifyToken, verifyRole(['superuser', 'maintainer', 'customer']), usersController.showProfile)
  .patch(verifyToken, verifyRole(['superuser', 'maintainer', 'customer']), usersController.updateProfile);

module.exports = router;
