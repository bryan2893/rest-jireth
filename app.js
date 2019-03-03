'use strict'

let app = require('express')();
const bodyParser = require('body-parser');

let cors = require('cors');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configuracion de CORS.
app.use(cors());

//controlador de comidas en la base de datos.
let comidasController = require('./controllers/comida');
//controlador de ordenes de compra en la base de datos.
let ordenesController = require('./controllers/orden_compra');
//controlador de usuarios administradores en la base de datos.
let administradoresController = require('./controllers/administrador');
//controlador de clientes en la base de datos.
let clientesController = require('./controllers/cliente');

let auth = require('./controllers/auth');
let middleWareAcceso = require('./middleware');


//CRUD comidas.
app.get('/comidas',comidasController.obtenerComidas);
app.post('/crear/comida',comidasController.crearComida);
app.get('/comida/:idComida',comidasController.obtenerComida);
app.delete('/borrar/comida/:idComida',comidasController.eliminarComida);
app.post('/actualizar/comida',comidasController.actualizarComida);
app.get('/comidas/:substring',comidasController.obtenerComidasQueCumplanSubCadena);

//CRUD ordenes de compra.
app.get('/ordenes',ordenesController.obtenerOrdenes);
app.post('/crear/orden',ordenesController.crearOrden);
app.get('/orden/:idOrden',ordenesController.obtenerOrden);
app.delete('/borrar/orden/:idOrden',ordenesController.eliminarOrden);
app.post('/actualizar/orden',ordenesController.actualizarOrden);
app.get('/ordenes/cliente/:cedulaCliente',ordenesController.obtenerOrdenesDeCliente);
app.get('/ordenes/anonimas',ordenesController.obtenerOrdenesAnonimas);

//CRUD administradores.
app.get('/administradores',administradoresController.obtenerAdministradores);
app.post('/crear/administrador',administradoresController.crearAdministrador);
app.get('/administrador/:idAdministrador',administradoresController.obtenerAdministrador);
app.delete('/borrar/administrador/:idAdministrador',middleWareAcceso.ensureAuthenticate,administradoresController.eliminarAdministrador);
app.post('/actualizar/administrador',administradoresController.actualizarAdministrador);

//CRUD clientes.
app.get('/clientes',clientesController.obtenerClientes);
app.post('/crear/cliente',clientesController.crearCliente);
app.get('/cliente/:cedulaCliente',clientesController.obtenerCliente);
app.delete('/borrar/cliente/:cedulaCliente',clientesController.eliminarCliente);
app.post('/actualizar/cliente/:cedulaCliente',clientesController.actualizarCliente);

//Ruta para loguear usuarios administradores.
app.post('/login',auth.login);

//se exporta app para que pueda ser reutilizado en otros módulos.
module.exports = app;