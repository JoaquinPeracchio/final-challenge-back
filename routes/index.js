var express = require('express');
var router = express.Router();
const commentRouter = require('./comments')
const userRouter = require('./users')
const productRouter = require('./products')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json();
});

router.use('/comments', commentRouter)
router.use('/auth', userRouter)
router.use('/products', productRouter)

module.exports = router;