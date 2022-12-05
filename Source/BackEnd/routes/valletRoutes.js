const express = require('express');
const router = express.Router();
const valletController = require('../controllers/vallet')

router.post('/addVallet/:manager_id',valletController.addVallet);
router.get('/valletsByManager/:manager_id',valletController.valletsByManager);
router.get('/valletById/:manager_id/:vallet_id',valletController.valletsById);
router.delete('/deletVallets/:manager_id/:vallet_id',valletController.deleteValletById);
router.put('/updateVallet/:manager_id/:vallet_id',valletController.updateValletById);

module.exports = router;