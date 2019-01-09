var express = require('express');
var router = express.Router();
var users = require('../controllers/UserController');

router.get('/profile', users.myProfile );
router.get('/users', users.allUsers );


module.exports = router;