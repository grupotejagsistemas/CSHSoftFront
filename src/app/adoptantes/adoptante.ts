import {Mascota} from './mascota';
import { EstadoAdoptante} from './estado-adoptante';

export class Adoptante {
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
    observaciones: string; 
    mascota: Mascota; 
    idEstadoAdoptante: EstadoAdoptante;
}
