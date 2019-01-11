var express  = require('express');
var router = express.Router();
var postController = require('../controllers/PostController');

//tekstamas iskoduoti is formu i json formata text
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var authguard = require('../guards/auth-guard');


var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});
var upload = multer({storage: storage});


//nuoroda sukuriau kuri atvaizduos to vartotojo visas ikeltas nuotraukas
router.get('/posts/all', authguard.canActivate, postController.showAll);

router.get('/posts/post/:id', authguard.canActivate, postController.showOne);

//authguard ateityje prideti
router.get('/posts/create', authguard.canActivate, postController.createShow);

//<input type="file" name="post-image"> nurodome name ->
router.post('/posts/create', authguard.canActivate, upload.single('post-image'), postController.onCreate);

//nuoroda atvaizduos forma su edit laukais 
router.get('/posts/edit/:id', authguard.canActivate, postController.editShow);

//nuoroda atvaizduos forma su edit laukais 
router.post('/posts/edit/:id', authguard.canActivate, upload.single('post-image'), postController.onEdit);
//nuoroda istrinti 
router.get('/posts/delete/:id', authguard.canActivate, postController.onDelete);


module.exports = router;