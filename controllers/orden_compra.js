//Se importa el modelo de orden para que el controlador lo pueda utilizar.
const ModeloOrdenCompra = require('../models/orden_compra');

crearOrden = function(req,res){

    let orden = new ModeloOrdenCompra();

    orden.cliente = req.body.cliente;
    orden.orden = req.body.orden;//array que aloja documentos {comida:"nombre comida",cantidad:2,precio:1000}
    orden.pagoCon = req.body.pagoCon;
    orden.montoTotal = orden.calcularMonto(); //se calcula montoTotal de manera automatica a partir de la orden de compra.
    orden.vuelto = orden.calcularVuelto(); //Se calcula el vuelto del cliente de manera automática.

    orden.save((err,ordenGuardada)=>{
        if(err){
            return res.status(500).send({mensage:"Error al guardar la orden en la base de datos"});
        }

        res.status(200).send({orden:ordenGuardada});
    });
};

//retorna array de ordenes contenidas en base de datos.
obtenerOrdenes = function(req,res){
    ModeloOrdenCompra.find({},(err,listaOrdenes)=>{
        if(err){
            return res.status(500).send({mensaje:"Eror al extraer las ordenes de la base de datos!"});
        }
        res.status(200).send({ordenes:listaOrdenes});
    });
};

//retorna una orden que coincida con el id enviado por req.params
obtenerOrden = function(req,res){
    let idOrden =  req.params.idOrden;//se obtiene el id de la comida que viene por parametro.

    ModeloOrdenCompra.findById(idOrden,function (err,ordenEncontrada){
        if(err){
            return res.status(500).send({mensaje:"Error al extraer la orden de la base de datos!"});
        }

        res.status(200).send({orden:ordenEncontrada});
    });
};

//Elimina una orden de la base de datos que coincide con id enviado por req.params.
eliminarOrden = function(req,res){
    let idOrden =  req.params.idOrden;//se obtiene el id de la comida que viene por parametro.

    ModeloOrdenCompra.findByIdAndDelete({_id:idOrden},function (err,ordenEliminada){
        if(err){
            return res.status(500).send({mensaje:"Error al eliminar la orden de la base de datos!"});
        }

        res.status(200).send({orden:ordenEliminada});
    });
};

//Actualiza una orden en la base de datos.
actualizarOrden = function(req,res){
    let idOrden = req.body.idOrden;

    let ord = req.body.orden;
    let pagCon = req.body.pagoCon; 
    let montoT = req.body.montoTotal;
    let vuelt = req.body.vuelto;

    ModeloOrdenCompra.findOneAndUpdate(idOrden,{orden:ord,pagoCon:pagCon,montoTotal:montoT,vuelto:vuelt},(err,ordenAnterior)=>{
        if(err){
            return res.status(500).send("Error al actualizar la orden de la base de datos!");
        }

        res.status(200).send({orden:ordenAnterior});
    });
};

//Obtiene las ordenes de compra pertenecientes a un cliente, por cedula.
let obtenerOrdenesDeCliente = function(req,res){
    let cedulaCliente = req.params.cedulaCliente;

    ModeloOrdenCompra.find({"cliente.cedula":cedulaCliente},function(err,listaOrdenes){
        if(err){
            return res.status(500).send({mensaje:err.message});
        }

        res.status(200).send({ordenes:listaOrdenes});
    });
};

//Obtiene las ordenes de compra que no pertenecen a usuarios registrados en el sistema.
let obtenerOrdenesAnonimas = function(req,res){

    ModeloOrdenCompra.find({"cliente.cedula":null},function(err,listaOrdenes){
        if(err){
            return res.status(500).send({mensaje:err.message});
        }

        res.status(200).send({ordenes:listaOrdenes});
    });
};

module.exports = {
    crearOrden,
    obtenerOrdenes,
    obtenerOrden,
    eliminarOrden,
    actualizarOrden,
    obtenerOrdenesDeCliente,
    obtenerOrdenesAnonimas
};