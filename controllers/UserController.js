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
    let name;
    if(req.params.name){
        name = req.params.name
    }else{
        name = req.user.name
    }
    User.findOne({name: name}, (err, userFromDB)=>{        
      res.render('profile', {user: userFromDB});
    })
}

module.exports = userController;