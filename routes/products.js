var express = require('express');
var router = express.Router();
const { create, all, read, update, destroy, readFromUser } = require('../controllers/productsController')

router.post('/', create);
router.get('/', all)
router.get('/:id', read);
router.get('/user/:id' ,readFromUser)
router.patch('/:id', update);
router.delete('/:id', destroy);

module.exports = router;