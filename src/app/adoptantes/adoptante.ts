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
    veteriniaria_cercana: [];
    observaciones: string; 
    mascotaInteresada: Mascota; 
    estado_adoptante: EstadoAdoptante;
}
