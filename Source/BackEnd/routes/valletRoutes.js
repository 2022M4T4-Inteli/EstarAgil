const express = require('express');
const router = express.Router();
const valletController = require('../controllers/vallet')

router.post('/addVallet',valletController.addVallet);
router.get('/vallets',valletController.viewVallets);
router.get('/valletsNames',valletController.namesVallets);
router.delete('/deletVallets/:id',valletController.deleteValletById);
router.put('/updateVallet',valletController.updateVallet);

module.exports = router;