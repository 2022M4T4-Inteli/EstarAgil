const express = require('express');
const router = express.Router();
const valletController = require('../controllers/vallet')

router.post('/vallet',valletController.addVallet);
router.get('/vallet',valletController.test);

module.exports = router;