var express = require('express');
var router = express.Router();
const commentRouter = require('./comments')
const userRouter = require('./users')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/comments', commentRouter)
router.use('/users', userRouter)

module.exports = router;