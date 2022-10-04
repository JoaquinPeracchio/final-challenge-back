var express = require('express');
var router = express.Router();
const commentRouter = require('./comments')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/comments', commentRouter)
module.exports = router;
