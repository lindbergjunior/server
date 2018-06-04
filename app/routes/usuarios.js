let controller = require("../controllers/usuarios.js"); 
let auth = require('../controllers/auth.js')

module.exports = function(app){
    app.post('/api/usuarios/singin',auth.logar);
    app.post("/api/usuarios", controller.inserirUsuario);
    app.use('/api/usuarios', auth.checar);
    app.get("/api/usuarios", controller.listarUsuarios);
    app.get("/api/usuarios/:id", controller.getUsuario);
    app.put("/api/usuarios", controller.editarUsuario);
    app.delete("/api/usuarios", controller.deletarUsuario);
    app.get("/api/usuarios/:id/posts", controller.getPostsUsuario);
     
    }
