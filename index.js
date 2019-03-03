const http = require('http');

let Expressapp = require('./app');
let httpServer = http.createServer(Expressapp);
const moongose = require('mongoose');
const config = require('./config');

const port = process.env.port || 3001;

moongose.connect(config.URL_CONNECTION,{useNewUrlParser:true},(err,res)=>{
    
    if(err){
        throw new Error("Error en la conexion a la base de datos");
    }

    httpServer.listen(port,function(){
        console.log('Servidor escuchando en el puerto '+port);
    });

});