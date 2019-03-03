//En este modulo se maneja la creacion de token para acceso de administradores.
let jwt = require('jwt-simple');
let config = require('../config');
let moment = require('moment');

//funcion que crea un token a partir de la informacion de un usuario administrador.
let createToken = function(usuarioAdministrador){
    let payload = {
        sub: usuarioAdministrador._id,
        iat: moment.unix(),
        exp: moment().add(14,"days").unix()
    };

    return jwt.encode(payload, config.SECRET_TOKEN); //retorna los datos anteriores codificados.
}

module.exports = {createToken};