let ModeloAdministrador = require('../models/administrador');
let service = require('../services');

let login = function(req,res){
    let user = req.body.usuario; //El cual es único en la base de datos, no puede haber otro igual.
    let con = req.body.contraseña;

    ModeloAdministrador.findOne({usuario:user,contraseña:con},function(err,usuarioAdministrador){

        if(err){
            return res.status(500).send({mensaje:err.message});
        }

        if(usuarioAdministrador){
            return res.status(200).send({token:service.createToken(usuarioAdministrador)});
        }else{
            return res.send({mensaje:"Credenciales inválidas"});
        }
    });
};

module.exports = {login};