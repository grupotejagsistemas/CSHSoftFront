import { Mascota } from './mascota';
import {Veterinaria} from './veterinaria';

export class FichaMedica {
    id: number; 
    fecha: string; 
    desparasitacion: string;
    productoDesparasitacion: string;
    vacuna: string; 
    nombreVacuna: string; 
    diagnostico: string; 
    mascota: Mascota;
    veterinaria: Veterinaria; 
    tratamiento: string; 
    descripcionTratamiento: string;
}
