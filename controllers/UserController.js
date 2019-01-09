var User = require('../models/User');
var userController = {};


userController.allUsers = (req, res)=>{
    var userList = [];
    User.find({}, (err, users)=>{
        users.map((user) => userList.push({vardas:user.name, el_pastas:user.username}));    
        res.render('users', {userList: userList, user: req.user});
    });
}

userController.myProfile =  (req, res) => {
    res.render('profile');
}

module.exports = userController;