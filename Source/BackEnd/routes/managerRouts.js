const express = require('express');
const router = express.Router();
const managerController = require('../controllers/manager')

// router.post('/login', managerController.login)
router.post('/register', managerController.register)
router.post('/login', managerController.login)

module.exports = router;