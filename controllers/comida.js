//controlador para extraer, modificar, eliminar y crear comidas del menu soda jeovha jireth.

//Se importa el modelo de comida para que el controlador lo pueda utilizar.
const ModeloComida = require('../models/comida');

//crea o agrega nueva comida en la base de datos().
crearComida = function(req,res){

    let comida = new ModeloComida();
    comida.nombre = req.body.nombre;
    comida.precio = req.body.precio;

    comida.save((err,comidaGuardada)=>{
        if(err){
            res.status(500).send({mensage:"Error al guardar la comida en la base de datos"});
        }
        res.status(200).send({comida:comidaGuardada});
    });
};

//retorna array de comidas contenidas en base de datos.
obtenerComidas = function(req,res){
    
    ModeloComida.find({},(err,listaComidas)=>{
        if(err){
            res.status(500).send({mensaje:"Eror al extraer las comidas de la base de datos!"});
        }
        res.status(200).send({comidas:listaComidas});
    });
};

//retorna una comida que coincida con el id enviado por req.params
obtenerComida = function(req,res){
    let idComida =  req.params.idComida;//se obtiene el id de la comida que viene por parametro.

    ModeloComida.findById(idComida,function (err,comidaEncontrada){
        if(err){
            res.status(500).send({mensaje:"Error al extraer la comida de la base de datos!"});
        }

        res.status(200).send({comida:comidaEncontrada});
    });
};

//Elimina una comida de la base de datos que coincide con id enviado por req.params.
eliminarComida = function(req,res){
    let idComida =  req.params.idComida;//se obtiene el id de la comida que viene por parametro.

    ModeloComida.findByIdAndDelete({_id:idComida},function (err,comidaEliminada){
        if(err){
            res.status(500).send({mensaje:"Error al eliminar la comida de la base de datos!"});
        }
        res.status(200).send({comida:comidaEliminada});
    });
};

//Actualiza una comida en la base de datos.
actualizarComida = function(req,res){
    let idComida = req.body.idComida;

    let nom = req.body.nombre;
    let pre = req.body.precio;
    let ima = req.body.imagen;

    ModeloComida.findOneAndUpdate(idComida,{nombre:nom,precio:pre,imagen:ima},(err,comidaAnterior)=>{
        if(err){
            res.status(500).send("Error al actualizar la comida de la base de datos!");
        }

        res.status(200).send({comida:comidaAnterior});
    });
};

//retorna comidas que contengan subcadena enviada por parametro.
obtenerComidasQueCumplanSubCadena = function(req,res){
    let substring =  req.params.substring;//se obtiene el substring para el query a la base de datos.

    ModeloComida.find({ "nombre" : { $regex: substring, $options: 'i' }},function (err,comidasEncontradas){
        if(err){
            res.status(500).send({mensaje:"Error en la búsqueda de comidas!"});
        }

        res.status(200).send({comidas:comidasEncontradas});
    });
};

module.exports = {
    crearComida,
    obtenerComidas,
    obtenerComida,
    eliminarComida,
    actualizarComida,
    obtenerComidasQueCumplanSubCadena
};