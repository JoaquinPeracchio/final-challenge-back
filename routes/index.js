var express = require('express');
var router = express.Router();
const userRouter = require('./users');

router.use('/auth', userRouter);

module.exports = router;
