var Usuario = require('../models/usuarios.js');
var Post = require('../models/posts.js');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');

// let usuarios = [{_id:1, nome:"Joao",matricula:"123"},
//               {_id:2,nome:"Pedro",matricula:"234"}];

module.exports.listarUsuarios = function(req,res){
    let promise = Usuario.find().exec();
    promise.then(
        function(usuarios){
            res.json(usuarios)
        },
        function(erro){
            res.status(500).end();
        }
    );
}

module.exports.getUsuario = function(req,res){
    // var id = req.params.id;
    let promise = Usuario.findById(id);
        promise.then(
            function(usuario){
                res.json(usuario)
        },
            function(erro){
                res.status(500).end("Não encontrou nada");
        }
    );

}
module.exports.inserirUsuario = function(req, res){
    let usuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync (req.body.senha, 10)
    });
    
    let promise = Usuario.create(usuario)
    promise.then(
        function(usuario) {
            res.status(201).json(usuario);
        },
        function(erro){
            res.status(500).json(erro);
        }
    );
}

module.exports.editarUsuario = function(req, res){
    // var id = req.params.id;
    var decode = jwt.decode(req.query.token);
    let idToken = decoded.user._id;
        
        let promise = Usuario.update(Usuario.findById(idToken), req.body);
        promise.then(
            function(usuario){
                res.json(usuario)
            },
            function(erro){
                res.status(404).send('Post não encontrado');
            }
        );
    };

module.exports.deletarUsuario = function(req, res){
    
    var decode = jwt.decode(req.query.token);
    let idToken = decoded.user._id;

    let promise = Usuario.findByIdAndRemove(idToken);
    promise.then(
      function(usuario){
        res.status(200).json(usuario);
      },
      function(erro){
        res.status(500).json(erro);
      }
    )
}

module.exports.getPostsUsuario = function(req,res){
    let promise = Post.find({'uid':req.params.id}).exec();
    promise.then(
        function(usuario){
          res.status(200).json(usuario);
        },
        function(erro){
          res.status(500).json(erro);
        }
    )
}

