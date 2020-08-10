import { Socket } from "socket.io";
import  socketIO  from "socket.io";
import { Usuario } from "../clases/usuario";
import { UsuariosLista } from "../clases/usuarios-lista";


export const usuariosConectados = new UsuariosLista();



// Conectar clientes

export const conectarCliente = ( cliente: Socket, io: SocketIO.Server ) => {

    const usuario = new Usuario ( cliente.id );
    usuariosConectados.agregarUser( usuario );

    }

// Desconexiones de clientes
export const disconnect = ( cliente:Socket, io: SocketIO.Server ) => {

    cliente.on ('disconnect', () => {
        console.log(`Cliente desconectado`);
    
    usuariosConectados.borrarUsuario( cliente.id );
        return console.log(`Se ha borrado el usuario ${cliente.id}`);

    io.emit( 'usuarios-activos', usuariosConectados.getLista() )
        
    });
}


// Escuchar mensajes de Angular en el servidor
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on( 'mensaje', (payload, callback?) => {
        console.log('Mensaje recibido', payload);


        io.emit( 'mensaje-nuevo', payload );
        
    });
}


// Configuracion del usuario
export const loginUser = ( cliente: Socket, io: SocketIO.Server, callback?: Function ) => {
   
    cliente.on( 'config-usuario', (payload, callback?) => {
        
        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );

        io.emit( 'usuarios-activos', usuariosConectados.getLista() )

        callback({
            ok: true,
            mensaje: `El usuario ${payload.nombre} configurado`
        })
    });
}


// Obtener Usuarios

export const obtenerUsuario = ( cliente: Socket, io: SocketIO.Server, callback?: Function ) => {
   
        cliente.on( 'obtener-usuarios', () => {

            io.to( cliente.id ).emit( 'usuarios-activos', usuariosConectados.getLista() )
        });
}
