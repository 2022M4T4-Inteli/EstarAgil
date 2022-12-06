const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/services')

router.get('/servicesById/:fk_rfid_code/:service_id', serviceController.servicesById);
router.post('/addService', serviceController.addService);
router.put('/updateStatus/:service_id', serviceController.updateStatus);
router.get('/activeServices', serviceController.activeServices);

module.exports = router;