const express = require('express');

const { verifyRole } = require('../middleware/verifyRole');
const { verifyToken } = require('../middleware/verifyToken');



const router = express.Router();


/* *** Superadmin and maintainer routes *** */
router.route('/')
  .get(verifyToken, verifyRole(['superuser', 'maintainer']), );

router.route('/:id')
  .get(verifyToken, verifyRole(['superuser', 'maintainer']), );

router.route('/')
  .post(verifyToken, verifyRole(['superuser', 'maintainer']), );

router.route('/:id')
  .patch(verifyToken, verifyRole(['superuser', 'maintainer']), )
  .delete(verifyToken, verifyRole(['superuser', 'maintainer']), )

/* *** customer routes **/
router.route('/my-orders')
  .get(verifyToken, verifyRole(['customer']), );

router.route('/my-orders/:id')
  .get(verifyToken, verifyRole(['customer']), )

module.exports = router;
