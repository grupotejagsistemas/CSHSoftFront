import {Mascota} from './mascota';
import { EstadoAdoptante} from './estado-adoptante';

export class Adoptante {
    id: number;
    numeroFormulario: number; 
    nombreCompleto: string; 
    fechaNacimiento: Date;
    domicilio: string;
    barrio: string;
    celular: string;
    email: string; 
    facebook: string; 
    instagram: string; 
    situacionLaboral: string; 
    // veteriniaria_cercana: [];
    observaciones: string; 
    mascotaInteresada: Mascota; 
    idMascota: number;
    idEstadoAdoptante: number;
    idVeterinaria: any [] = [];
    estado_adoptante: EstadoAdoptante;


constructor (){

    }


public static build(){
    const adoptante= new Adoptante();
    adoptante.id = null;
    adoptante.numeroFormulario= null; 
    adoptante.nombreCompleto= ""; 
    adoptante.fechaNacimiento= null;
    adoptante.domicilio= "";
    adoptante.barrio= "";
    adoptante.celular= "";
    adoptante.email= ""; 
    adoptante.facebook= ""; 
    adoptante.instagram= ""; 
    adoptante.situacionLaboral= ""; 
    adoptante.observaciones= ""; 
    adoptante.mascotaInteresada= null; 
    adoptante.idMascota= null;
    adoptante.idEstadoAdoptante= null;
    adoptante.idVeterinaria=  [] = [];
    adoptante.estado_adoptante= {id: 0, descripcion: ''};

    return adoptante;
    }
}