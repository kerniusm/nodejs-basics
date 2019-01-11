const express = require('express');

var app = express();

var mongoose = require('mongoose');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var cookieParser = require('cookie-parser');

app.use(session({
    secret: 'ManoSlaptasKeyKurioPagalbaUzkoduosVartotojuSlaptazodziuIDB',
    resave: false,
    saveUninitialized: false
}))
  
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
//javascript -> moka kaip bicas pazadeti kazka
mongoose.Promise = global.Promise;

//http:// -> mysql:// ->
mongoose.connect('mongodb://localhost/mano-projekto-db', { useNewUrlParser: true })
.then(() => console.log('Success connect to Database'))
.catch((error)=> console.log(error));

//apacioje esantis kodas veliau bus isskaidytas i kitus folderius...
var port = 3000;

app.listen(port, () => {console.log(`Server is running on http://localhost:${port}/`)});

app.set('view engine', 'ejs');

app.use(express.static('public'));
var User = require('./models/User');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routes from index.js
app.use('/', require('./routes/index'));
app.use('/', require('./routes/users'));
app.use('/', require('./routes/posts'));


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('404');
});