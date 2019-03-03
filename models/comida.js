const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let esquemaComida = new Schema({
    nombre:String,
    precio:{type:Number,default:0}
});

let modeloComida = mongoose.model('Comida', esquemaComida);

module.exports = modeloComida;