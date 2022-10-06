var express = require('express');
var router = express.Router();
const { read, signUp, signIn, signOut } = require('../controllers/usersController');

router.get('/', read);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);

module.exports = router;
