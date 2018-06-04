let express = require('express');
let bodyParser = require('body-parser')
let path = require('path');

let usuariosRouter = require('../app/routes/usuarios.js');
let postsRouter = require('../app/routes/posts.js');

module.exports = function() {
    var app = express();
    app.set("port", 3000);
    app.use(express.static('./public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    usuariosRouter(app);
    postsRouter(app); 

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

return app;

};
