const ModeloCliente = require('../models/cliente');


crearCliente = function(req,res){

    let cliente = new ModeloCliente();

    cliente.cedula = req.body.cedula;
    cliente.nombreCompleto = req.body.nombreCompleto;
    cliente.telefono = req.body.telefono;
    cliente.sexo = req.body.sexo;

    cliente.save((err,clienteCreado)=>{
        if(err){
            console.log("Ocurrio error en la peticion "+err.message);
            return res.status(500).send({mensage:err.message});
        }
        
        res.status(200).send({cliente:clienteCreado});
    });

};

obtenerClientes = function(req,res){
    ModeloCliente.find({},(err,listaClientes)=>{
        if(err){
            return res.status(500).send({mensaje:"Eror al extraer los usuarios administradores de la base de datos!"});
        }
        res.status(200).send({clientes:listaClientes});
    });
};

obtenerCliente = function(req,res){
    let cedulaCliente =  req.params.cedulaCliente;
    
    ModeloCliente.findOne({cedula:cedulaCliente},function (err,clienteEncontrado){
        if(err){
            return res.status(500).send({mensaje:err.message});
        }

        res.status(200).send({cliente:clienteEncontrado});
    });
};

eliminarCliente = function(req,res){
    let cedulaCliente =  req.params.cedulaCliente;

    ModeloCliente.findOneAndRemove({cedula:cedulaCliente},function (err,clienteEliminado){
        if(err){
            return res.status(500).send({mensaje:err.message});
        }

        res.status(200).send({cliente:clienteEliminado});
    });
};

actualizarCliente = function(req,res){
    let cedulaCliente =  req.params.cedulaCliente;

    let nom = req.body.nombre;
    let tels = req.body.telefonos;

    ModeloCliente.findOneAndUpdate({cedula:cedulaCliente},{nombreCompleto:nom,telefonos:tels},(err,clienteAnterior)=>{
        if(err){
            return res.status(500).send({mensaje:err.message});
        }
        res.status(200).send({cliente:clienteAnterior});
    });
};

module.exports = {
    crearCliente,
    obtenerClientes,
    obtenerCliente,
    eliminarCliente,
    actualizarCliente
};