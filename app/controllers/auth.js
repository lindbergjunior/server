let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let Usuario = require('../models/usuarios.js');

module.exports.checar = function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
}; 

module.exports.logar = function(req,res){
function logar(user){
    if(!bcrypt.compareSync(req.body.senha, user.senha)){
        falhar();
    }else{
        let token = jwt.sign({user: user}, 'secret');
        res.status(200).json({
            message:"Logado",
            token: token,
            userId: user._id
        })

    }
}
function falhar(){
    res.status(401).send('Invalid login');
}
Usuario.findOne({email:req.body.email}).exec().then(logar,falhar);
}