const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let esquemaCliente = new Schema({
    cedula:{type:String,required:true,unique:true},
    nombreCompleto: {type:String,required:true},
    sexo : String,
    telefono: Number
});

let modeloCliente = mongoose.model('Cliente',esquemaCliente);

module.exports = modeloCliente;