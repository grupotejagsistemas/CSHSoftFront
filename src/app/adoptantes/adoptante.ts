import {Mascota} from './mascota';
import { EstadoAdoptante} from './estado-adoptante';

export class Adoptante {
    idAdoptante: number;
    mascota: Mascota; 
    numeroFormulario: number; 
    nombreCompleto: string; 
    edad: string;
    domicilio: string;
    barrio: string;
    celular: string;
    email: string; 
    facebook: string; 
    instagram: string; 
    situacionLaboral: string; 
    observaciones: string; 
    estado: EstadoAdoptante;
}
