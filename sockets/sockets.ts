import { Socket } from "socket.io";
import  socketIO  from "socket.io";


// Desconexiones de clientes
export const disconnect = ( cliente:Socket ) => {

    cliente.on ('disconnect', () => {
        console.log(`Cliente desconectado`);
    });
}


// Escuchar mensajes de Angular en el servidor
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on( 'mensaje', (payload, callback?) => {
        console.log('Mensaje recibido', payload);


        io.emit( 'mensaje-nuevo', payload );
        
    });
}