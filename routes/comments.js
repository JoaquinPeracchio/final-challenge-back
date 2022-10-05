var express = require('express');
var router = express.Router();

const { createComment, editComment, readComment, readCommentByID, deleteComment } = require('../controllers/commentsController')

router.post('/', createComment)
router.put('/:id', editComment)
router.get('/product/:id', readComment)
router.get('/:id', readCommentByID)
router.delete('/product/:id', deleteComment)


module.exports = router;