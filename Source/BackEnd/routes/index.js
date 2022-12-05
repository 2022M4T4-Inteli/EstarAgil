const router = require('express-promise-router')();

router.get('/api', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Welcome to Estapar Management API',
    version: '1.0.0',
  });
});

module.exports = router;


