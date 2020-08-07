import { Usuario } from "./usuario";


export class UsuariosLista {

    private lista: Usuario[] = [];


    constructor(){

    }


    // Agregar usuario
    public agregarUser( usuario: Usuario ) {
        this.lista.push( usuario );
        console.log('New user', this.lista);
        
        return usuario;
    }

    // Actualizar nombres
    public actualizarNombre( id: string, nombre: string ){

        for ( let usuario of this.lista ) {

            if ( usuario.id === id ) {
                usuario.nombre = nombre;
                break;
            } 

        }
        console.log('Actualizacion de usuarios');
        console.log(this.lista);
    }


    // Lista de usuarios
    public getLista(){
        return this.lista;
    }

    // Traer usuario por ID
    public getUsuario(id: string){
        return this.lista.find( usuario => usuario.id === id );
    }


    // Obtener usuario de una sala en particular 
    public getUsuariosEnSala(sala:string){
        return this.lista.filter( usuario => usuario.sala === sala );
    }


    // Borrar usuarios de la lista
    public borrarUsuario(id: string){

        const tempUser = this.getUsuario(id);
        // Buscar en la lista todos los usuarios que NO coincidan con el id a borrar
        this.lista = this.lista.filter( usuario => usuario.id !== id );

        return tempUser;
    }

}