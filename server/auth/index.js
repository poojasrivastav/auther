const router =  require('express').Router();

router.use('/local', require('./local'));
router.use('/google', require('./google'));
module.exports = router;
