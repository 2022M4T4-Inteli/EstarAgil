const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders')

router.get('/servicesById/:fk_rfid_code/:id_order', orderController.servicesById);
router.post('/addService', orderController.addService);

module.exports = router;