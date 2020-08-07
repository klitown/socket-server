import Server from "./clases/server";
import router from './routes/router'

import bodyParser from 'body-parser'
import cors from 'cors'

const server = Server.instance;

// Body Parser : Obtener informacion de POST
server.app.use( bodyParser.urlencoded( { extended:true }) );
server.app.use( bodyParser.json() );

// Cors
server.app.use( cors( { origin: true, credentials: true } ) );





// Rutas de servicios
server.app.use('/', router)

server.startServer( () => {
    console.log('Servidor iniciado correctamente');
});