var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');

let ensureAuthenticate = function(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({mensaje:"Peticion sin cabecera de autorización"});
    }
    
    let token = req.headers.authorization;
    let payload = jwt.decode(token, config.SECRET_TOKEN);

    if(payload.exp <= moment.unix()){
        return res.status(401).send({mensaje:"El token ha expirado"});
    }

    req.user = payload.sub; //se pasa al objeto req el id del usuario que se decodifico del token.
    next();
}

module.exports = {ensureAuthenticate};