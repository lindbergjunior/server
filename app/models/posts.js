// app/models/post.js

var mongoose = require('mongoose');

module.exports = function(){
    var schema = mongoose.Schema({
        texto: {
            type:String,
            required: true
        },
        like: {
            type: Number,
            required: true,
    
        },
        uid:{
            type: mongoose.Schema.ObjectId,
            ref: "Usuario"

        }
});

return mongoose.model('Post', schema);
}();
