var http = require('http');
var app = require('./config/express.js')();
var db = require('./config/database.js');

http.createServer(app).listen(app.get('port'),function(){
console.log("Servidor rodando MEU DEUS ERA SÓ ISSO");
});
db('mongodb://localhost:27017/test');
