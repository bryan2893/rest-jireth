const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let esquemaAdministrador = new Schema({
    nombre:{type:String,required:true},
    usuario:{type:String,required:true,unique:true},
    contraseña:{type:String,required:true}
});

let modeloAdministrador = mongoose.model('Administradore', esquemaAdministrador);

module.exports = modeloAdministrador;