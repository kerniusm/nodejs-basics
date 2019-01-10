var express = require('express');
var router = express.Router();
var users = require('../controllers/UserController');

var authGuard = require('../guards/auth-guard');

router.get('/profile/:name', authGuard.canActivate, users.myProfile );
router.get('/users', authGuard.canActivate , users.allUsers );


module.exports = router;