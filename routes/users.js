var express = require('express');
var router = express.Router();
const { read, signUp, signIn, signOut, sells, buys, emailVerificaiton } = require('../controllers/usersController');

router.get('/', read);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.post('/sell/:id', sells);
router.post('/buy/:id',buys);
router.get('/verify/:uniqueString', emailVerificaiton);
module.exports = router;
