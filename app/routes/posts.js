let controller = require("../controllers/posts.js");
var auth = require("../controllers/auth.js");

module.exports = function(app){
    
    app.use("/api/posts", auth.logar);
    app.get("/api/posts", controller.listarPosts);
    app.get("/api/posts/:id", controller.getPost);
    app.post("/api/posts/", controller.inserirPost);
    app.put("/api/posts/:id", controller.editarPost);
    app.delete("/api/posts/:id", controller.deletarPost);
    app.get("/api/posts/:id/usuario", controller.getUsuarioPost);
    
    }