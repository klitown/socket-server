import express from "express";
import { SERVER_PORT } from "../global/enviroment";
import http from 'http'
// Socket IO
import  socketIO  from "socket.io";

import * as socketCfg from "../sockets/sockets";



export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;


    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );
        this.escucharSockets();
    }


    public static get instance(){
        return this._instance || ( this._instance = new this() );
    }





    private escucharSockets(){
        console.log('Conexiones sockets');

        // Conexion de un cliente
        this.io.on( 'connection', cliente => {
            console.log('Cliente conectado. ID del cliente:', cliente.id);

        
        // Conectar cliente

        socketCfg.conectarCliente( cliente );


        // Desconexion de cliente
        socketCfg.disconnect( cliente );

        // Mensaje de cliente
        socketCfg.mensaje( cliente, this.io );

        socketCfg.loginUser( cliente, this.io );
        });

        

        
    }



    startServer( callback: VoidFunction ){
        this.httpServer.listen(this.port, callback);
    }


}