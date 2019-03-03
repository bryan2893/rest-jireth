const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let esquemaOrden = new Schema({
    cliente:{type:Object, required:true}, //{cedula:"115600837",nombreCliente:"Bryan Hernandez Arguello"} ó {nombreCliente:"Bryan Hernández"}
    orden: Array, //array que aloja documentos {comida:"nombre comida",cantidad:2,precio:1000}
    fecha:{type:Date,default:Date.now()}, //fecha en que se realizó la orden de compra.
    pagoCon:{type:Number,required:true}, //cantidad con la que pagó el cliente.
    montoTotal:{type:Number,required:true},
    vuelto:{type:Number,required:true} //vuelto que se supone se le debio dar a la persona.
});

//metodo que calcula el total de la orden de compra recorriendo el arreglo que contiene la especificacion de la compra.
esquemaOrden.methods.calcularMonto = function(){
    let montoTotal = 0;
    for(let i = 0;i<this.orden.length;i++){
        montoTotal += this.orden[i].cantidad*this.orden[i].precio;
    }
    return montoTotal;
}

//metodo que calcula el total de la orden de compra recorriendo el arreglo que contiene la especificacion de la compra.
esquemaOrden.methods.calcularVuelto = function(){
   return this.pagoCon - this.montoTotal;
}

let modeloOrden = mongoose.model('Ordene', esquemaOrden);

module.exports = modeloOrden;