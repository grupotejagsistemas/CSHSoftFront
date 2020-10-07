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
    mascota: number[];
    veterinaria: number[]; 
    tratamiento: string; 
    descripcionTratamiento: string;

    constructor() {} 

    public static build(){
        const fichaMedica = new FichaMedica();
        fichaMedica.id = null;
        fichaMedica.desparasitacion = "";
        fichaMedica.productoDesparasitacion= "";
        fichaMedica.vacuna = "";
        fichaMedica.nombreVacuna= ""; 
        fichaMedica.diagnostico= ""; 
        fichaMedica.mascota= null;
        fichaMedica.veterinaria= null; 
        fichaMedica.tratamiento= ""; 
        fichaMedica.descripcionTratamiento= "";

        return fichaMedica;
    }
}
