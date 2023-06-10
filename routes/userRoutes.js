const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { verifyToken } = require('../middleware/verifyToken');
const {verifyRole} = require('../middleware/verifyRole');

/* RUTAS PARA SUPERUSER Y MAINTAINER */
router.route('/')
  .get(verifyToken, verifyRole(['maintainer', 'superuser']), usersController.getAllUsers)
  .post(verifyToken, verifyRole(['superuser', 'maintainer']), usersController.createNewUser)

router.route('/:id')
  .get(verifyToken, verifyRole(['maintainer', 'superuser']), usersController.getUser)
  .patch(verifyToken, verifyRole(['maintainer', 'superuser']),usersController.updateUser)
  .delete(verifyToken, verifyRole(['maintainer', 'superuser']), usersController.deleteUser);

/* RUTAS PARA CUSTOMER */
router.patch('/:id/password', verifyToken, verifyRole(['customer']), usersController.updatePassword);

router.route('/customer/profile')
  .get(verifyToken, verifyRole(['superuser', 'maintainer', 'customer']), /* crear controlador */)
  .patch(verifyToken, verifyRole(['superuser', 'maintainer', 'customer']), /* crear controlador */)

module.exports = router;
