var User = require('../models/User');
var passport = require('passport');
authController = {};


authController.home = function(req, res){
   res.render('index', {user: req.user});
}

authController.login = function(req, res){
   res.render('login');
}

authController.register = (req, res) =>{
    res.render('register');
}

authController.doRegister = (req, res)=>{
    //ateityje pasidarysime validacijas....
    User.register(new User(
        {
            username: req.body.email, //vatotojo el. pastas
            name: req.body.name //vartotojo vardas
        }), req.body.password, (error, user)=>{
            
            if(error){
                return res.render('register')
            }
            passport.authenticate('local')(req, res, ()=>{
                res.redirect('/')
            })
        }
    )
}

authController.doLogin = (req, res)=>{
    passport.authenticate('local')(req, res, function () {

        res.redirect('/');
      });
}

authController.doLogout = (req, res)=>{
    req.logout();
    res.redirect('/');
}

module.exports = authController;