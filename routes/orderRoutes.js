const express = require('express');

const orderController = require('../controllers/orderController');
const { verifyRole } = require('../middleware/verifyRole');
const { verifyToken } = require('../middleware/verifyToken');



const router = express.Router();

/* *** customer routes **/
router.route('/my-orders')
  .get(verifyToken, verifyRole(['customer']), orderController.getMyOrders)
  .post(verifyToken, verifyRole(['customer']),orderController.createMyOrder);

router.route('/my-orders/:id')
  .get(verifyToken, verifyRole(['customer']), orderController.getOneMyOrder);

/* *** Superadmin and maintainer routes *** */
router.route('/')
  .get(verifyToken, verifyRole(['superuser', 'maintainer']), orderController.getAllOrders);

router.route('/:id')
  .get(verifyToken, verifyRole(['superuser', 'maintainer']), orderController.getOrder);

router.route('/')
  .post(verifyToken, verifyRole(['superuser', 'maintainer']), orderController.createOrder);

router.route('/:id')
  .patch(verifyToken, verifyRole(['superuser', 'maintainer']), orderController.updateOrder)
  .delete(verifyToken, verifyRole(['superuser', 'maintainer']), orderController.deleteOrder);

router.route('/restore-order/:id')
  .patch(verifyToken, verifyRole(['superuser', 'maintainer']), orderController.restoreOrder);




module.exports = router;
