var express = require('express');
var router = express.Router();
const { create, read, update, destroy } = require('')

router.post('/', create);
router.get('/:id', read);
router.patch('/:id', update);
router.delete('/:id', destroy);

module.exports = router;