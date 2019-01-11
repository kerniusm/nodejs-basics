var Post = require('../models/Post');

postController = {};


//index - kuriame atvaizduojama visas sarasas ->
postController.showAll = (req, res) =>{
    //mongoDB ieskosime nuotrauku , kurios turi user_id ir mano kaip user.id
    Post.find({user_id: req.user.id}, (err, postsFromDB)=>{  
        res.render('posts/list', {postList: postsFromDB, user: req.user});
    });
}

//funkcijas kuri paiima posta is duombazes pagal post.id
postController.showOne = (req, res) => {
    Post.findById(req.params.id, (err, postFromDB)=>{        
        res.render('posts/post', {post: postFromDB, user: req.user});
    })
}

//sioje vietoje atvaizduojame forma GET
postController.createShow = (req, res) =>{
    res.render('posts/create', {user: req.user});
}

//sioje vietoje saugo i duombaze POST
postController.onCreate = (req, res) => {
    //susikursime objekta kuris turi atrodyti kaip Post.js Modelis
    var newPost = Post({
        description: req.body['post-description'],
        image_path: '/images/' + req.file.filename,
        user_id: req.user.id
    });


    //sukurta nauja objekta issaugau i mongoDB
    newPost.save(function(err, post) {
        if (err) throw err;
        res.redirect('/posts/post/'+ post.id);
    });

}
//sioje vietoje atvaizduojame forma su laukeliais kuriuos koreguosime GET
postController.editShow = (req, res) =>{
    Post.findById(req.params.id, (err, postFromDB)=>{        
        res.render('posts/edit', {post: postFromDB, user: req.user});
    })
}

//sioje vietoje atvaizduojame forma su laukeliais kuriuos koreguosime POST -> PUT
//pvz .: title -> antanas 
postController.onEdit = (req, res) =>{
    Post.findById(req.params.id, (err, postFromDB)=>{
        postFromDB.description = req.body['post-description'];
        if(req.file){
            postFromDB.image_path = '/images/' + req.file.filename;       
        }
        postFromDB.save(function(err, post) {
        if (err) throw err;
            res.render('posts/post', {post: post, user: req.user});
        });  
    })
}

//POST GET -> DELETE
postController.onDelete = (req, res) =>{
    Post.findById(req.params.id, function(err, post) {
        if (err) throw err;
        if(req.user.id != post.user_id){           
            res.redirect('/');
        }
        // istrinimas is duombazes
        post.remove(function(err) {
            if (err) throw err;
            res.redirect('/posts/all');
        });
    });
} 

module.exports = postController;