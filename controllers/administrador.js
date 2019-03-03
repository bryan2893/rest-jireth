const ModeloAdministrador = require('../models/administrador');


crearAdministrador = function(req,res){

    let administrador = new ModeloAdministrador();
    administrador.nombre = req.body.nombre;
    administrador.usuario = req.body.usuario;
    administrador.contraseña = req.body.contraseña;

    administrador.save((err,adminCreado)=>{
        if(err){
            return res.status(500).send({mensage:err.message});
        }
        res.status(200).send({administrador:adminCreado});
    });
};

obtenerAdministradores = function(req,res){
    ModeloAdministrador.find({},(err,listaAdministradores)=>{
        if(err){
            return res.status(500).send({mensaje:"Eror al extraer los usuarios administradores de la base de datos!"});
        }
        res.status(200).send({administradores:listaAdministradores});
    });
};

obtenerAdministrador = function(req,res){
    let idAdministrador =  req.params.idAdministrador;

    ModeloAdministrador.findById(idAdministrador,function (err,administradorEncontrado){
        if(err){
            return res.status(500).send({mensaje:err.message});
        }

        res.status(200).send({administrador:administradorEncontrado});
    });
};

eliminarAdministrador = function(req,res){
    let idAdministrador =  req.params.idAdministrador;

    ModeloAdministrador.findByIdAndDelete({_id:idAdministrador},function (err,administradorEliminado){
        if(err){
            return res.status(500).send({mensaje:err.message});
        }

        res.status(200).send({administrador:administradorEliminado});
    });
};

actualizarAdministrador = function(req,res){
    let idAdministrador =  req.params.idAdministrador;

    let nom = req.body.nombre;
    let usu = req.body.usuario;
    let con = req.body.contraseña;

    ModeloAdministrador.findOneAndUpdate(idAdministrador,{nombre:nom,usuario:usu,contraseña:con},(err,adminAnterior)=>{
        if(err){
            return res.status(500).send({mensaje:err.message});
        }

        res.status(200).send({administrador:adminAnterior});
    });
};

module.exports = {
    crearAdministrador,
    obtenerAdministradores,
    obtenerAdministrador,
    eliminarAdministrador,
    actualizarAdministrador
};