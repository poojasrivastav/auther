const router = require('express').Router();

router.use('/users', require('./user'));

router.use('/stories', require('./story'));

module.exports = router;
