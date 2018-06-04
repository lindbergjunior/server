var Post = require('../models/posts.js');
var Usuario = require('../models/usuarios.js');
let jwt = require('jsonwebtoken');

module.exports.listarPosts = function(req, res){
    let promise = Post.find().exec();
    promise.then(
        function(posts){
            res.json(posts)
        },
        function(erro){
            res.status(500).end();
        }
    );
};
module.exports.getPost = function(req, res){
    var id = req.params.id;
    let promise = Post.findById(id);
    promise.then(
        function(post){
            res.json(post)
        },
        function(erro){
            res.status(404).send('Post não encontrado');
        }
    );
};
module.exports.inserirPost = function(req, res){
    let decoded = jwt.decoded(req.query.token);
    let idTokenUser = decoded.user._id;
    let post = new Post({
        texto: req.body.texto,
        likes: req.body.likes,
        uid: idTokenUser
    });
    let promise = Post.create(post);
    promise.then(
        function(post) {
            res.status(201).json(post);
        },
        function(error){
            res.status(500).send(erro);
        }
    );
};
module.exports.editarPost = function(req, res){
    // var id = req.params.id;
    var decode = jwt.decode(req.query.token);
    let id = req.params.id;
    let idPostUsuario = req.body.uid;
    let idToken = decoded.user._id;
        if(idToken==idPostUsuario){
            let promise = Post.update(Post.findById(id), req.body);
            promise.then(
                function(post){
                    res.json(post)
                },
                function(erro){
                    res.status(404).send('Post não encontrado');
                }
            );
        };
    }

 
module.exports.deletarPost = function(req, res){
    // var id = req.params.id;
    let decoded = jwt.decoded(req.query.token);
    let idTokenUser = decoded.user._id;
    let post = Post.findById(id).exec();
    let uid;
    post.then(
        function(post){
            uid = post.uid;
            (function(){
                if(idTokenUser == uid){
                    let promise = Post.findByIdAndRemove(id);
                    promise.then(
                        function(post){
                            res.status(200).json(post);
                        },
                        function(erro){
                            res.status(500).json(erro);
                        }
                    )
                }
            })();
        },
        function(erro){
            res.status(404).send('Post não encontrado');
        }
    )
    
};
module.exports.getUsuarioPost = function(req, res){
    let post = Post.findById(req.params.id).exec();
    let id;
    post.then(
        function(post){
            console.log(post);
            id = post.uid;
            (function(){
                let promise = Usuario.find({'_id':id}).exec();
                promise.then(
                    function(usuario){
                        res.json(usuario);
                    },
                    function(erro){
                        res.status(404).json(erro);
                    }
                )
            }());
        },
        function(erro){
            console.log(erro);
        }
    )
};